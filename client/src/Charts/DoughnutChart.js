import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ chartData, headerInfo, chartTitle }) => {
  return (
    <div className="chart-container" style={{ height: "25vh" }}>
      <h2 style={{ textAlign: "center" }}>{chartTitle}</h2>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: headerInfo,
            },
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;
