export interface Option {
  id: string; // 'A', 'B'
  text: {
    pt: string;
    en: string;
    es: string;
  };
  effect: {
    axis: 'E' | 'I' | 'S' | 'N' | 'T' | 'F';
    points: number;
  };
}

export interface Question {
  id: number;
  text: {
    pt: string;
    en: string;
    es: string;
  };
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: {
      pt: 'Você acabou de ter uma semana super intensa e cheia de desafios. Como você escolhe recarregar suas energias no fim de semana?',
      en: 'You just had a super intense week full of challenges. How do you choose to recharge your energy on the weekend?',
      es: 'Acabas de tener una semana súper intensa y llena de desafíos. ¿Cómo eliges recargar tus energías el fin de semana?'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'Reunindo os amigos para um rolê animado, jantando fora ou conversando com pessoas.',
          en: 'Gathering friends for a lively hangout, dining out, or talking to people.',
          es: 'Reuniendo a tus amigos para una salida divertida, cenando fuera o conversando con gente.'
        },
        effect: { axis: 'E', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'Ficando debaixo das cobertas assistindo a uma série ou lendo um bom livro no meu casulo.',
          en: 'Staying under the covers watching a series or reading a good book in my cocoon.',
          es: 'Quedándote bajo las cobijas viendo una serie o leyendo un buen libro en mi capullo.'
        },
        effect: { axis: 'I', points: 2 }
      }
    ]
  },
  {
    id: 2,
    text: {
      pt: 'Em um grupo de trabalho ou em uma roda de conversa, você geralmente:',
      en: 'In a work group or a circle of conversation, you usually:',
      es: 'En un grupo de trabajo o en una rueda de conversación, tú generalmente:'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'Fala o que pensa logo de cara e adora trocar ideias e debater ativamente.',
          en: 'Speak your mind right away and love to exchange ideas and debate actively.',
          es: 'Dices lo que piensas de inmediato y te encanta intercambiar ideas y debatir activamente.'
        },
        effect: { axis: 'E', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'Escuta bastante, processa o que foi dito e fala quando sente que tem algo realmente importante a somar.',
          en: 'Listen a lot, process what was said, and speak when you feel you have something really important to add.',
          es: 'Escuchas mucho, procesas lo que se ha dicho y hablas cuando sientes que tienes algo realmente importante que aportar.'
        },
        effect: { axis: 'I', points: 2 }
      }
    ]
  },
  {
    id: 3,
    text: {
      pt: 'Quando você vai aprender algo novo, o que te atrai mais de primeira?',
      en: 'When you are going to learn something new, what attracts you most at first?',
      es: 'Cuando vas a aprender algo nuevo, ¿qué es lo que más te atrae al principio?'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'Exemplos práticos, dados concretos e coisas que eu possa aplicar imediatamente no meu dia a dia.',
          en: 'Practical examples, concrete data, and things that I can apply immediately in my daily life.',
          es: 'Ejemplos prácticos, datos concretos y cosas que pueda aplicar inmediatamente en mi día a día.'
        },
        effect: { axis: 'S', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'Teorias interessantes, conceitos abstratos e a possibilidade de criar conexões com outras ideias futuristas.',
          en: 'Interesting theories, abstract concepts, and the possibility of creating connections with other futuristic ideas.',
          es: 'Teorías interesantes, conceptos abstractos y la posibilidad de crear conexiones con otras ideas futuristas.'
        },
        effect: { axis: 'N', points: 2 }
      }
    ]
  },
  {
    id: 4,
    text: {
      pt: 'Se você ganhasse uma viagem surpresa de férias, qual seria a sua reação imediata?',
      en: 'If you won a surprise vacation trip, what would be your immediate reaction?',
      es: 'Si ganaras un viaje de vacaciones sorpresa, ¿cuál sería tu reacción inmediata?'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'Gostaria de saber logo os detalhes do roteiro, onde vamos ficar e o que vamos comer (gosto do concreto).',
          en: 'I would want to know the details of the itinerary, where we will stay, and what we will eat (I like concrete things).',
          es: 'Me gustaría saber pronto los detalles del itinerario, dónde nos hospedaremos y qué comeremos (me gusta lo concreto).'
        },
        effect: { axis: 'S', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'Ficaria super animado imaginando as infinitas possibilidades e surpresas da viagem, sem me importar com o cronograma.',
          en: 'I would be super excited imagining the endless possibilities and surprises of the trip, without caring about the schedule.',
          es: 'Me emocionaría mucho imaginando las infinitas posibilidades y sorpresas del viaje, sin importar el cronograma.'
        },
        effect: { axis: 'N', points: 2 }
      }
    ]
  },
  {
    id: 5,
    text: {
      pt: 'Um amigo muito próximo te procura com um problema difícil e chorando. Qual é a sua reação natural?',
      en: 'A very close friend comes to you with a difficult problem and crying. What is your natural reaction?',
      es: 'Un amigo muy cercano te busca con un problema difícil y llorando. ¿Cuál es tu reacción natural?'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'Analisar a situação logicamente e tentar propor uma solução prática e objetiva para resolver o problema dele.',
          en: 'Analyze the situation logically and try to propose a practical and objective solution to solve their problem.',
          es: 'Analizar la situación lógicamente e intentar proponer una solución práctica y objetiva para resolver su problema.'
        },
        effect: { axis: 'T', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'Demonstrar empatia imediata, acolher como ele se sente e dar apoio emocional antes de pensar em qualquer solução.',
          en: 'Show immediate empathy, embrace how they feel, and give emotional support before thinking of any solution.',
          es: 'Demostrar empatía inmediata, acoger cómo se siente y dar apoyo emocional antes de pensar en cualquier solución.'
        },
        effect: { axis: 'F', points: 2 }
      }
    ]
  },
  {
    id: 6,
    text: {
      pt: 'Ao tomar uma decisão pessoal importante, o que costuma pesar mais para você no veredito final?',
      en: 'When making an important personal decision, what usually weighs more for you in the final verdict?',
      es: 'Al tomar una decisión personal importante, ¿qué suele pesar más para ti en el veredicto final?'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'A lógica pura e simples: o que faz mais sentido racionalmente e traz os melhores resultados práticos.',
          en: 'Pure and simple logic: what makes the most sense rationally and brings the best practical results.',
          es: 'La lógica pura y simple: lo que tiene más sentido racionalmente y trae los mejores resultados prácticos.'
        },
        effect: { axis: 'T', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'Os meus valores pessoais, a empatia e o impacto que essa decisão terá nas pessoas ao meu redor.',
          en: 'My personal values, empathy, and the impact that this decision will have on the people around me.',
          es: 'Mis valores personales, la empatía y el impacto que esta decisión tendrá en las personas que me rodean.'
        },
        effect: { axis: 'F', points: 2 }
      }
    ]
  }
];
