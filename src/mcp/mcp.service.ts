import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { QuizService } from '../quiz/quiz.service';

@Injectable()
export class McpService implements OnModuleInit {
  private server: Server;

  constructor(private readonly quizService: QuizService) {
    this.server = new Server(
      { name: 'BambuMind-Server', version: '1.0.0' },
      { capabilities: { tools: {} } }
    );
  }

  async onModuleInit() {
    this.setupTools();
    
    // Connect MCP to standard I/O (stdio)
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }

  private setupTools() {
    // 1. List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_next_question',
          description: 'Busca a próxima pergunta do teste de personalidade.',
          inputSchema: {
            type: 'object',
            properties: {
              sessionId: { type: 'string', description: 'ID único da sessão do chat' },
              userMessage: {
                type: 'string',
                description: 'Opcional. A mensagem ou contexto digitado pelo usuário (usado para detectar dinamicamente o idioma).'
              }
            },
            required: ['sessionId']
          }
        },
        {
          name: 'submit_answer',
          description: 'Envia a resposta do usuário para uma determinada pergunta.',
          inputSchema: {
            type: 'object',
            properties: {
              sessionId: { type: 'string', description: 'ID único da sessão do chat' },
              questionId: { type: 'number', description: 'ID numérico da pergunta respondida' },
              optionId: { type: 'string', description: 'ID da opção selecionada (ex: A, B)' }
            },
            required: ['sessionId', 'questionId', 'optionId']
          }
        },
        {
          name: 'calculate_personality_result',
          description: 'Calcula o resultado final baseado em todas as respostas enviadas.',
          inputSchema: {
            type: 'object',
            properties: {
              sessionId: { type: 'string', description: 'ID único da sessão do chat' }
            },
            required: ['sessionId']
          }
        }
      ]
    }));

    // 2. Handle tool executions
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      const sessionId = args?.sessionId as string;

      if (!sessionId) {
        throw new Error('sessionId é obrigatório');
      }

      switch (name) {
        case 'get_next_question': {
          const userMessage = args?.userMessage as string | undefined;
          const result = this.quizService.getNextQuestion(sessionId, userMessage);
          return {
            content: [{ type: 'text', text: JSON.stringify(result) }]
          };
        }
        
        case 'submit_answer': {
          const qId = args?.questionId as number;
          const optId = args?.optionId as string;
          if (qId === undefined || !optId) {
            throw new Error('questionId e optionId são obrigatórios para submit_answer');
          }
          const result = this.quizService.submitAnswer(sessionId, qId, optId);
          return {
            content: [{ type: 'text', text: JSON.stringify(result) }]
          };
        }
        
        case 'calculate_personality_result': {
          const result = this.quizService.calculateResult(sessionId);
          return {
            content: [{ type: 'text', text: JSON.stringify(result) }]
          };
        }
        
        default:
          throw new Error(`Ferramenta não encontrada: ${name}`);
      }
    });
  }
}
