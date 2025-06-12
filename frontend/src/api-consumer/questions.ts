import type {
  GetQuestionHistoryByIdResponse,
  GetQuestionHistoryResponse,
  PostQuestionResponse,
} from "../interfaces/Question";
import baseAPI from "./baseAPI";

export const postQuestions = async (question: string) => {
  const result = await baseAPI.post("/questions", { question });

  return result.data as PostQuestionResponse;
};

export const getQuestionHistoryList = async (
  page: number = 1,
  pageSize: number = 20
) => {
  const result = await baseAPI.get(
    `/questions/history?page=${page}&page_size=${pageSize}`
  );

  return result.data as GetQuestionHistoryResponse;
};

export const getQuestionHistoryById = async (id: number) => {
  const result = await baseAPI.get(`/questions/history/${id}`);

  return result.data as GetQuestionHistoryByIdResponse;
};
