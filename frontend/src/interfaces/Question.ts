import type { ChartConfig, ChartType } from "./Charts";

interface BasicAPIResponse {
  success: boolean;
  message?: string;
}

interface PagingResponse<T> extends BasicAPIResponse {
  data: T[];
  page: number;
  page_size: number;
}

export interface PostQuestionResponse extends BasicAPIResponse {
  description?: string;
  display_type?: ChartType;
  data: any[];
  config: ChartConfig;
}

export interface GetQuestionHistoryResponse
  extends PagingResponse<ListQuestionHistory> {}

export interface GetQuestionHistoryByIdResponse extends BasicAPIResponse {
  data: QuestionHistory;
}

export interface ListQuestionHistory {
  id: number;
  question: string;
  succesful_response: number;
  chart_type: ChartType | null;
  created_at: string;
}

export interface QuestionHistory extends ListQuestionHistory {
  json_response: string | null;
  chart_config: string | null;
  description: string | null;
}
