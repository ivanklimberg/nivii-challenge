import type { ChartType } from "chart.js";
import type { ChartConfig } from "./Charts";

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
  data: any;
  config: ChartConfig;
}

export interface GetQuestionHistoryResponse
  extends PagingResponse<ListQuestionHistory> {}

export interface ListQuestionHistory {
  id: number;
  question: string;
  succesful_response: boolean;
  chart_type: ChartType | null;
  created_at: string;
}

export interface QuestionHistory extends ListQuestionHistory {
  json_response: string | null;
  description: string | null;
}
