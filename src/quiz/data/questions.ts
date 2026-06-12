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
          es: 'La lógica pura y simple: lo que tiene más sentido racionalmente y trae los melhores resultados prácticos.'
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
  },
  {
    id: 7,
    text: {
      pt: 'Em uma reunião social com pessoas novas, você costuma:',
      en: 'At a social gathering with new people, you usually:',
      es: 'En una reunión social con gente nueva, tú sueles:'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'Circular pela sala, fazer novos contatos e puxar conversa com facilidade.',
          en: 'Circulate the room, make new contacts, and start conversations easily.',
          es: 'Circular por la sala, hacer nuevos contactos y entablar conversación con facilidad.'
        },
        effect: { axis: 'E', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'Ficar perto de pessoas conhecidas e conversar em grupos menores e mais tranquilos.',
          en: 'Stay close to familiar people and talk in smaller, quieter groups.',
          es: 'Quedarte cerca de personas conocidas y conversar en grupos más pequeños y tranquilos.'
        },
        effect: { axis: 'I', points: 2 }
      }
    ]
  },
  {
    id: 8,
    text: {
      pt: 'Quando você quer resolver um dilema pessoal, você prefere:',
      en: 'When you want to resolve a personal dilemma, you prefer to:',
      es: 'Cuando quieres resolver un dilema personal, prefieres:'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'Conversar com outras pessoas para clarear os pensamentos e ouvir opiniões externas.',
          en: 'Talk with other people to clear your thoughts and hear external opinions.',
          es: 'Conversar con otras personas para aclarar tus pensamientos y escuchar opiniones externas.'
        },
        effect: { axis: 'E', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'Refletir sozinho em silêncio antes de tomar qualquer decisão ou falar sobre o assunto.',
          en: 'Reflect alone in silence before making any decision or talking about it.',
          es: 'Reflexionar solo en silencio antes de tomar cualquier decisión o hablar sobre el tema.'
        },
        effect: { axis: 'I', points: 2 }
      }
    ]
  },
  {
    id: 9,
    text: {
      pt: 'Se você tivesse que descrever um objeto ou paisagem, você focaria em:',
      en: 'If you had to describe an object or landscape, you would focus on:',
      es: 'Si tuvieras que describir un objeto o paisaje, te enfocarías en:'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'Detalhes visíveis e realistas, como cores, texturas e formas exatas.',
          en: 'Visible and realistic details, such as colors, textures, and exact shapes.',
          es: 'Detalles visibles y realistas, como colores, texturas y formas exactas.'
        },
        effect: { axis: 'S', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'O clima geral, os sentimentos que a cena evoca e as metáforas que vêm à mente.',
          en: 'The overall mood, the feelings the scene evokes, and the metaphors that come to mind.',
          es: 'El clima general, los sentimientos que evoca la escena y las metáforas que te vienen a la mente.'
        },
        effect: { axis: 'N', points: 2 }
      }
    ]
  },
  {
    id: 10,
    text: {
      pt: 'Ao planejar um projeto novo, você prefere começar por:',
      en: 'When planning a new project, you prefer to start by:',
      es: 'Al planificar un proyecto nuevo, prefieres empezar por:'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'As etapas práticas e o cronograma detalhado de tarefas imediatas.',
          en: 'The practical steps and the detailed schedule of immediate tasks.',
          es: 'Las etapas prácticas y el cronograma detalhado de tarefas imediatas.'
        },
        effect: { axis: 'S', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'A visão geral, o propósito maior e as possibilidades futuras do projeto.',
          en: 'The big picture, the larger purpose, and the future possibilities of the project.',
          es: 'La visión general, el propósito mayor y las posibilidades futuras del proyecto.'
        },
        effect: { axis: 'N', points: 2 }
      }
    ]
  },
  {
    id: 11,
    text: {
      pt: 'Se ocorresse um conflito entre colegas na sua equipe, você priorizaria:',
      en: 'If a conflict occurred between colleagues on your team, you would prioritize:',
      es: 'Si ocurriera un conflicto entre colegas en tu equipo, priorizarías:'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'Esclarecer os fatos com imparcialidade e aplicar as regras de forma justa para resolver a disputa.',
          en: 'Clarify the facts impartially and apply the rules fairly to resolve the dispute.',
          es: 'Aclarar los hechos con imparcialidad y aplicar las reglas de forma justa para resolver la disputa.'
        },
        effect: { axis: 'T', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'Restaurar a harmonia do grupo e garantir que todas as partes se sintam ouvidas e acolhidas.',
          en: 'Restore group harmony and ensure all parties feel heard and welcomed.',
          es: 'Restaurar la armonía del grupo y asegurar que todas las partes se sientan escuchadas y acogidas.'
        },
        effect: { axis: 'F', points: 2 }
      }
    ]
  },
  {
    id: 12,
    text: {
      pt: 'Quando alguém te dá um feedback, você prefere que a pessoa seja:',
      en: 'When someone gives you feedback, you prefer them to be:',
      es: 'Cuando alguien te da una retroalimentación, prefieres que sea:'
    },
    options: [
      {
        id: 'A',
        text: {
          pt: 'Direta, objetiva e focada puramente na qualidade do trabalho técnico.',
          en: 'Direct, objective, and focused purely on the quality of the technical work.',
          es: 'Directa, objetiva y enfocada puramente en la calidad del trabajo técnico.'
        },
        effect: { axis: 'T', points: 2 }
      },
      {
        id: 'B',
        text: {
          pt: 'Sensível, encorajadora e focada no seu desenvolvimento pessoal e sentimentos.',
          en: 'Sensitive, encouraging, and focused on your personal growth and feelings.',
          es: 'Sensible, alentadora y enfocada en tu crecimiento personal y sentimientos.'
        },
        effect: { axis: 'F', points: 2 }
      }
    ]
  }
];
