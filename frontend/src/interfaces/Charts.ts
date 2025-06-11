export type ChartType = "pie" | "bar" | "line" | "table" | "none";

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
