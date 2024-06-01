import { QUESTIONS, PERSONAS } from "./constants";
import type { TPersona, TQuestion, TResponse } from "./types";

function loadQuestions(): TQuestion[] {
  return QUESTIONS.map((question) => {
    return {
      question_id: question.question_id,
      question: question.question,
      dimension: question.dimension,
    };
  });
}

function loadPersonas(): TPersona[] {
  return PERSONAS.map((persona) => {
    return {
      persona_id: persona.persona_id,
      name: persona.name,
      description: persona.description,
      criteria: persona.criteria,
    };
  });
}

const personas = loadPersonas();
const questions = loadQuestions();

// Pre-process question dimensions for quick lookup
const questionDimensionMap: Record<number, string> = {};
questions.forEach((question) => {
  questionDimensionMap[question.question_id] = question.dimension;
});

// Pre-process persona criteria for quick lookup
const personaCriteriaMap: Record<number, Record<string, Set<string>>> = {};
personas.forEach((persona) => {
  const criteriaMap: Record<string, Set<string>> = {};
  Object.entries(persona.criteria).forEach(([dimension, values]) => {
    criteriaMap[dimension] = new Set(values);
  });
  personaCriteriaMap[persona.persona_id] = criteriaMap;
});

export function matchPersona(responses: TResponse[]): TPersona | null {
  let bestMatch: TPersona | null = null;
  let bestScore = -1;

  for (const persona of personas) {
    let score = 0;

    for (const response of responses) {
      const dimension = questionDimensionMap[response.question_id];
      if (
        dimension &&
        personaCriteriaMap[persona.persona_id]?.[dimension]?.has(
          response.response,
        )
      ) {
        score++;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = persona;
    }
  }

  return bestMatch;
}
