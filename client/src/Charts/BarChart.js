// components/BarChart.js
import { Bar } from "react-chartjs-2";
const BarChart = ({ chartData, headerInfo, chartTitle }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{chartTitle}</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: headerInfo,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
