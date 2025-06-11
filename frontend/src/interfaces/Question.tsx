export type ChartType = "pie" | "bar" | "line" | "table" | "none";

interface BasicAPIResponse {
  success: boolean;
  message?: string;
}

export interface PostQuestionResponse extends BasicAPIResponse {
  description?: string;
  display_type?: ChartType;
  data: any;
  config: ChartConfig;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
}

export interface ChartConfig {
  x: string;
  y: string;
  series?: string;
}
