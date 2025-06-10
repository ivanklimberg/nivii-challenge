import baseAPI from "./baseAPI";

export const postQuestions = async (question: string) => {
  const result = await baseAPI.post("/questions", { question });

  return result.data as {
    success: boolean;
    message?: string;
    display_type?: "pie" | "bar" | "line" | "table" | "none";
    data: any[];
  };
};
