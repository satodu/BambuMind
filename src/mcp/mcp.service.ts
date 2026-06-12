import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, ListPromptsRequestSchema, GetPromptRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { QuizService } from '../quiz/quiz.service';

@Injectable()
export class McpService implements OnModuleInit {
  private server: Server;

  constructor(private readonly quizService: QuizService) {
    this.server = new Server(
      { name: 'BambuMind-Server', version: '1.0.0' },
      { capabilities: { tools: {}, prompts: {} } }
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
          description: 'Busca a próxima pergunta do teste de personalidade de forma adaptativa.',
          inputSchema: {
            type: 'object',
            properties: {
              sessionId: { type: 'string', description: 'ID único da sessão do chat' },
              userMessage: {
                type: 'string',
                description: 'Opcional. A mensagem ou contexto digitado pelo usuário (usado para detectar dinamicamente o idioma).'
              },
              axis: {
                type: 'string',
                enum: ['E_I', 'S_N', 'T_F'],
                description: 'Opcional. O eixo específico do teste de personalidade que a IA deseja avaliar.'
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
        },
        {
          name: 'add_mbti_score',
          description: 'Adiciona pontos a um eixo específico (E, I, S, N, T, F) no teste de personalidade dinâmico da IA.',
          inputSchema: {
            type: 'object',
            properties: {
              sessionId: { type: 'string', description: 'ID único da sessão do chat' },
              axis: {
                type: 'string',
                enum: ['E', 'I', 'S', 'N', 'T', 'F'],
                description: 'Eixo para o qual adicionar pontuação.'
              },
              points: {
                type: 'number',
                description: 'Quantidade de pontos a adicionar (ex: 2).'
              }
            },
            required: ['sessionId', 'axis', 'points']
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
          const axis = args?.axis as 'E_I' | 'S_N' | 'T_F' | undefined;
          const result = this.quizService.getNextQuestion(sessionId, userMessage, axis);
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

        case 'add_mbti_score': {
          const axis = args?.axis as 'E' | 'I' | 'S' | 'N' | 'T' | 'F';
          const points = args?.points as number;
          if (!axis || points === undefined) {
            throw new Error('axis e points são obrigatórios para add_mbti_score');
          }
          const result = this.quizService.addMbtiScore(sessionId, axis, points);
          return {
            content: [{ type: 'text', text: JSON.stringify(result) }]
          };
        }
        
        default:
          throw new Error(`Ferramenta não encontrada: ${name}`);
      }
    });

    // 3. List available prompts
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => ({
      prompts: [
        {
          name: 'mbti_personality_test',
          description: 'Act as a professional MBTI psychologist administering a dynamic, adaptive personality test.'
        }
      ]
    }));

    // 4. Handle get prompt
    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      const { name } = request.params;
      if (name !== 'mbti_personality_test') {
        throw new Error(`Prompt não encontrado: ${name}`);
      }

      return {
        description: 'Act as a professional MBTI psychologist administering a dynamic, adaptive personality test.',
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: "You are a professional MBTI psychologist administering a dynamic, adaptive personality test.\n\n" +
                "Your goal is to assess the user's MBTI profile across three dimensions:\n" +
                "- Extraversion (E) vs Introversion (I)\n" +
                "- Sensing (S) vs Intuition (N)\n" +
                "- Thinking (T) vs Feeling (F)\n\n" +
                "INSTRUCTIONS:\n" +
                "1. Introduce yourself warmly and explain that this is a dynamic, conversational personality test. Let the user know you will ask 6 questions one-by-one.\n" +
                "2. Ask exactly 6 questions in total (2 per axis: E/I, S/N, T/F). Ask them one at a time, waiting for the user's answer before proceeding.\n" +
                "3. Each question must offer two distinct options: option A and option B (where one option reflects one trait and the other reflects the opposite trait of that axis).\n" +
                "4. Do NOT mention technical details (like points, axes, or tool names) in your conversation. Keep the dialogue fully immersive and psychological.\n" +
                "5. When the user selects option A or B, determine which trait (E, I, S, N, T, or F) their choice corresponds to, and immediately call the `add_mbti_score` tool to submit 2 points for that trait (e.g. axis='E', points=2).\n" +
                "6. After all 6 questions have been answered and their scores submitted, call the `calculate_personality_result` tool to retrieve the final profile.\n" +
                "7. Present the user with a detailed, engaging report summarizing their calculated MBTI profile and traits in a warm, insightful manner.\n" +
                "8. Refuse to discuss topics unrelated to the personality test.\n" +
                "9. Always respond in the language the user speaks (or defaults to Portuguese if they start in Portuguese, or English, etc.)."
            }
          }
        ]
      };
    });
  }
}
