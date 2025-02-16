import { Game } from "@/components/game/Game";
import { getAnswersByQuestionId, getQuestionsByQuizId } from "@/lib/quiz";
import React from "react";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface GamePageProps {
  searchParams: SearchParams;
}

export default async function GamePage({ searchParams }: GamePageProps) {
  const activeQuestion = 4;
  const code = (await searchParams).code;
  if (!code) return;
  const questions = getQuestionsByQuizId(+code);
  const answers = getAnswersByQuestionId(questions[activeQuestion].id);

  return (
    <Game
      label={questions[activeQuestion].question}
      questionId={questions[activeQuestion].id}
      answers={answers}
    />
  );
}
