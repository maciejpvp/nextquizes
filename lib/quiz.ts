import db from "./db";

type QuestionType = {
  id: number;
  quiz_id: number;
  question: string;
  image: string;
};

export type AnswerType = {
  id: number;
  answer: string;
  correct: number;
  question_id: number;
};

export const getQuizById = (id: number) => {
  const quiz = db.prepare(`SELECT * FROM quizzes WHERE id=?`).all(id);
  return quiz;
};

export const getQuestionsByQuizId = (id: number): QuestionType[] => {
  const quiz = db
    .prepare(`SELECT * FROM questions WHERE quiz_id=?`)
    .all(id) as QuestionType[];
  return quiz;
};

export const getAnswersByQuestionId = (id: number): AnswerType[] => {
  const quiz = db
    .prepare(`SELECT id, answer FROM answers WHERE question_id=?`)
    .all(id) as AnswerType[];
  return quiz;
};

export const isAnswerValid = (id: number) => {
  const answer = db
    .prepare("SELECT correct FROM answers WHERE id=?")
    .get(id) as AnswerType;
  const isValid = answer.correct === 1 ? true : false;
  return isValid;
};

export const getValidAnswer = (id: number) => {
  const answer = db
    .prepare("SELECT id FROM answers WHERE correct=1 AND question_id=?")
    .all(id) as { id: number }[];

  return answer.map((a) => a.id);
};
