import type { ChartData } from "chart.js";
import type { ChartConfig, ChartType } from "../interfaces/Question";

export const convertDataToChartInput = (
  data: any[],
  type: ChartType,
  config: ChartConfig
) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Input data must be a non-empty array");
  }

  if (!config.x || !config.y) {
    throw new Error("Unable to determine x and y keys");
  }

  // PIE / BAR
  if (type === "pie" || type === "bar") {
    const labels = data.map((d) => String(d[config.x]));
    const values = data.map((d) => Number(d[config.y]));

    return {
      labels,
      datasets: [
        {
          label: config.y,
          data: values,
          backgroundColor:
            type === "pie"
              ? generateColors(values.length)
              : ["rgba(75, 192, 192, 0.2)"],
          borderColor: type === "bar" ? ["rgba(75, 192, 192, 1)"] : undefined,
        },
      ],
    };
  }

  // LINE — support single-line or multi-line
  if (type === "line") {
    const allLabelsSet = new Set<string>();
    const datasetsMap: Record<string, Record<string, number>> = {};

    for (const row of data) {
      const x = String(row[config.x]);
      const y = Number(row[config.y]);
      const series = config.series ? String(row[config.series]) : config.y;

      if (!datasetsMap[series]) {
        datasetsMap[series] = {};
      }

      datasetsMap[series][x] = y;
      allLabelsSet.add(x);
    }

    const allLabels = Array.from(allLabelsSet).sort();
    const seriesNames = Object.keys(datasetsMap);

    const datasets = seriesNames.map((seriesName, idx) => ({
      label: seriesName,
      data: allLabels.map((label) => datasetsMap[seriesName][label] ?? 0),
      borderColor: generateColors(10)[idx % 10],
      backgroundColor: "transparent",
      fill: false,
    }));

    return {
      labels: allLabels,
      datasets,
    };
  }

  throw new Error(`Unsupported chart type: ${type}`);
};

const generateColors = (count: number) => {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#C9CBCF",
    "#FF5E5E",
    "#57D9A3",
    "#6A5ACD",
    "#FF7F50",
    "#7FDBFF",
    "#2ECC40",
    "#FFB6C1",
    "#B10DC9",
    "#FFDC00",
    "#3D9970",
    "#39CCCC",
    "#FF851B",
    "#A9A9A9",
    "#F012BE",
    "#01FF70",
    "#85144B",
    "#B22222",
    "#20B2AA",
    "#DAA520",
    "#8A2BE2",
    "#5F9EA0",
    "#708090",
    "#E9967A",
  ];

  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};
