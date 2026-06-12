import { Injectable } from '@nestjs/common';
import { questions } from './data/questions';

interface SessionState {
  answeredQuestions: number[];
  scores: Record<'E' | 'I' | 'S' | 'N' | 'T' | 'F', number>;
  language: 'pt' | 'en' | 'es';
}

@Injectable()
export class QuizService {
  private sessions = new Map<string, SessionState>();

  private getSession(sessionId: string): SessionState {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        answeredQuestions: [],
        scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0 },
        language: 'pt', // Default to Portuguese
      };
      this.sessions.set(sessionId, session);
    }
    return session;
  }

  private detectLanguage(text: string): 'pt' | 'en' | 'es' {
    const clean = text.toLowerCase();
    
    // Simple vocabulary detection
    const enIndicators = ['hello', 'hi', 'hey', 'how are you', 'good morning', 'good afternoon', 'good evening', 'start', 'test', 'ready'];
    const esIndicators = ['hola', 'cómo estás', 'como estas', 'buenos días', 'buenos dias', 'buenas tardes', 'buenas noches', 'empezar', 'prueba', 'listo'];

    if (enIndicators.some(indicator => clean.includes(indicator))) {
      return 'en';
    }
    if (esIndicators.some(indicator => clean.includes(indicator))) {
      return 'es';
    }
    return 'pt';
  }

  getNextQuestion(sessionId: string, userMessage?: string, axis?: 'E_I' | 'S_N' | 'T_F') {
    const session = this.getSession(sessionId);

    // Detect language if a message was provided (e.g. initial greeting)
    if (userMessage) {
      session.language = this.detectLanguage(userMessage);
    }

    // Filter out already answered questions
    const availableQuestions = questions.filter(q => !session.answeredQuestions.includes(q.id));

    if (availableQuestions.length === 0) {
      return { status: 'completed' as const };
    }

    // Determine the raw question to present
    let rawQuestion = availableQuestions[0]; // default fallback

    if (axis) {
      // Find a question that belongs to the requested axis
      // We check if any option's effect targets the characters in the axis string (e.g., E or I for E_I)
      const targetAxes = axis.split('_');
      const matchingQuestions = availableQuestions.filter(q => 
        q.options.some(o => targetAxes.includes(o.effect.axis))
      );

      if (matchingQuestions.length > 0) {
        rawQuestion = matchingQuestions[0];
      }
    }

    const lang = session.language;

    return {
      status: 'pending' as const,
      question: {
        id: rawQuestion.id,
        text: rawQuestion.text[lang],
        options: rawQuestion.options.map(o => ({
          id: o.id,
          text: o.text[lang],
          effect: o.effect,
        })),
      },
      language: lang, // Inform caller which language is active
    };
  }

  submitAnswer(sessionId: string, questionId: number, optionId: string) {
    const session = this.getSession(sessionId);
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      throw new Error(`Pergunta com ID ${questionId} não encontrada`);
    }

    const selectedOption = question.options.find((o) => o.id === optionId);
    if (selectedOption) {
      const { axis, points } = selectedOption.effect;
      session.scores[axis] = (session.scores[axis] || 0) + points;
    } else {
      throw new Error(`Opção ${optionId} inválida para a pergunta ${questionId}`);
    }

    // Register this question as answered if not already present
    if (!session.answeredQuestions.includes(questionId)) {
      session.answeredQuestions.push(questionId);
    }

    return this.getNextQuestion(sessionId);
  }

  addMbtiScore(sessionId: string, axis: 'E' | 'I' | 'S' | 'N' | 'T' | 'F', points: number) {
    const session = this.getSession(sessionId);
    session.scores[axis] = (session.scores[axis] || 0) + points;
    return { status: 'success', scores: session.scores };
  }

  calculateResult(sessionId: string) {
    const session = this.getSession(sessionId);
    const { scores, language } = session;

    const p1 = (scores.E ?? 0) >= (scores.I ?? 0) ? 'E' : 'I';
    const p2 = (scores.N ?? 0) >= (scores.S ?? 0) ? 'N' : 'S';
    const p3 = (scores.F ?? 0) >= (scores.T ?? 0) ? 'F' : 'T';

    const profile = `${p1}${p2}${p3}`;

    // Clean up the session state after quiz completion
    this.sessions.delete(sessionId);

    return { profile, scores, language };
  }
}
