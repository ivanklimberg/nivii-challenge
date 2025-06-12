import type { PostQuestionResponse } from "../../interfaces/Question";
import { Bar, Pie, Line } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import { convertDataToChartInput } from "../../helpers/chartDataHelper";

interface Props {
  questionResponse: PostQuestionResponse;
}

const ChartDataMapper = ({ questionResponse }: Props) => {
  const chartData = convertDataToChartInput(
    questionResponse.data,
    questionResponse.display_type!,
    questionResponse.config
  );

  return (
    <div>
      {questionResponse.display_type === "pie" && (
        <Pie data={chartData as ChartData<"pie", any[], unknown>} />
      )}
      {questionResponse.display_type === "line" && (
        <Line data={chartData as ChartData<"line", any[], unknown>} />
      )}
      {questionResponse.display_type === "bar" && (
        <Bar data={chartData as ChartData<"bar", any[], unknown>} />
      )}
    </div>
  );
};

export default ChartDataMapper;
