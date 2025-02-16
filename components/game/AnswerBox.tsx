"use client";

type AnswerBoxProps = {
  id: number;
  label: string;
  index: number;
  isAnswered: number | undefined;
  handleAnswer: (id: number) => void;
  correctAnswer: number[];
};

export const AnswerBox = ({
  id,
  label,
  index,
  isAnswered,
  handleAnswer,
  correctAnswer,
}: AnswerBoxProps) => {
  console.log(id);
  const color = !isAnswered
    ? index === 0
      ? "bg-red-700"
      : index === 1
      ? "bg-blue-700"
      : index === 2
      ? "bg-yellow-600"
      : index === 3
      ? "bg-green-700"
      : "bg-green-700"
    : correctAnswer?.includes(id)
    ? "bg-green-500"
    : "bg-stone-900";

  return (
    <button
      className={`${color} w-[100%] h-28`}
      onClick={() => handleAnswer(id)}
    >
      <p className="text-xl opacity-90">{label}</p>
    </button>
  );
};
