export type TResponse = {
  question_id: number;
  response: string;
};

export type TPersona = {
  persona_id: number;
  name: string;
  description: string;
  criteria: Record<string, string[]>;
};

export type TQuestion = {
  question_id: number;
  question: string;
  dimension: string;
};
