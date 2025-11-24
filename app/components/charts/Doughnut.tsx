import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Center Text Plugin
const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart:any, args:any, options:any) {
    const { ctx } = chart;
    const { top, left, width, height } = chart.chartArea;

    ctx.save();
    ctx.font = options.font || "bold 28px Arial";
    ctx.fillStyle = options.color || "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(options.text, left + width / 2, top + height / 2);
    ctx.restore();
  },
};

ChartJS.register(centerTextPlugin);

const options = {
  maintainAspectRatio: false,
  cutout: "87%",              // 👈 your custom donut thickness
  plugins: {
    legend: { display: false },
    centerText: {
      text: "0%",             // default, will be replaced dynamically
      color: "#37A2D7",
      font: "bold 20px Urbanist",
    },
  },
};

const data = {
  datasets: [
    {
      data: [75, 25],
      backgroundColor: ["#37A2D7", "#F4F4F4"],
      borderWidth: 0,
    },
  ],
};
const DoughnutChart = ({ value }:any) => {
  return (
    <div style={{ width: "100%", height: "86px", position: "relative" }}>
      <Doughnut
        data={data}
        options={{
          ...options,
          cutout: "87%", // optional, but you can override here too
          plugins: {
            ...options.plugins,
            centerText: {
              ...options.plugins.centerText,
              text: `50%`,  // 🔥 dynamic value here
            },
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart