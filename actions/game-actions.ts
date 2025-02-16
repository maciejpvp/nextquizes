"use server";
import { getValidAnswer } from "@/lib/quiz";

export const validateAnswer = async (
  _: unknown,
  id: number
): Promise<number[]> => {
  const isValid = getValidAnswer(id) as number[];
  console.log(isValid);
  return isValid;
};
