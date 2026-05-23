export type DSAPattern = {
  id: string;
  name: string;
  explanation: string;
  signals: string[];
  whenToUse: string[];
  commonProblems: string[];
  template?: string;
  complexity: {
    time: string;
    space: string;
  };
  voiceOver: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctAnswers: string[];
  explanation: string;
  signals?: string[];
  relatedProblems?: string[];
};

export type CodeTemplate = {
  id: string;
  title: string;
  pattern: string;
  language: "javascript";
  chunks: Array<
    | { type: "text"; value: string }
    | { type: "blank"; answer: string; acceptedAnswers?: string[] }
  >;
  explanation: string;
};

export type ComplexityQuestion = {
  id: string;
  title: string;
  snippet: string;
  timeAnswer: string;
  spaceAnswer: string;
  explanation: string;
};

export type SystemDesignCheatsheet = {
  id: string;
  title: string;
  summary: string;
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  coreEntities: string[];
  apiSketch: string[];
  architecture: string[];
  databaseChoices: string[];
  cachingStrategy: string[];
  queuesEvents: string[];
  scalingBottlenecks: string[];
  tradeoffs: string[];
  failureModes: string[];
  talkingPoints: string[];
};

export type SystemDesignConcept = {
  id: string;
  concept: string;
  explanation: string;
  whenItMatters: string;
  interviewPhrase: string;
  exampleUsage: string;
};

export type SystemDesignTradeoff = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type ExplainBackPrompt = {
  id: string;
  prompt: string;
  modelAnswer: string;
  checklist: string[];
};
