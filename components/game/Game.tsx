"use client";
import { AnswerType } from "@/lib/quiz";
import { AnswerBox } from "./AnswerBox";
import { startTransition, useActionState, useState } from "react";
import { validateAnswer } from "@/actions/game-actions";

type GameProps = {
  label: string;
  questionId: number;
  answers: AnswerType[];
};

export const Game = ({ label, questionId, answers }: GameProps) => {
  const [formState, formAction] = useActionState(validateAnswer, undefined);
  const [isAnswered, setIsAnswered] = useState<number | undefined>(undefined);
  console.log(formState);
  const handleAnswer = (id: number) => {
    setIsAnswered(id);
    startTransition(() => {
      formAction(questionId);
    });
  };

  return (
    <div className="w-dvw h-dvh flex justify-center items-center text-pretty">
      <div className="bg-violet-900 p-4 text-center flex flex-col gap-5 w-[900px]">
        <h1 className="font-semibold text-3xl text-violet-100">{label}</h1>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
          {answers.map((item, index) => (
            <li key={item.id}>
              <AnswerBox
                id={item.id}
                label={item.answer}
                index={index}
                isAnswered={isAnswered}
                correctAnswer={formState}
                handleAnswer={handleAnswer}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
