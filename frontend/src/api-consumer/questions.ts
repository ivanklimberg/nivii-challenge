import type { PostQuestionResponse } from "../interfaces/Question";
import baseAPI from "./baseAPI";

export const postQuestions = async (question: string) => {
  const result = await baseAPI.post("/questions", { question });

  return result.data as PostQuestionResponse;
};
