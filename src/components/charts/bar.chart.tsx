"use client";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  LabelList,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: -3800,
    amt: 2500,
  },
];

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value.split(" ")[1]}
      </text>
    </g>
  );
};

const AppBarChart = () => {
  return (
    <div>
      AppChart
      <div style={{ width: "50%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          {/* <BarChart height={40} data={data}>
            <Bar dataKey="uv" fill="#8884d8" />
          </BarChart> */}

          <BarChart data={data}>
            {/* config lưới  */}
            <CartesianGrid strokeDasharray="3 3" />

            {/* trục x nằm ngang */}
            <XAxis dataKey="name" />

            {/* trục Y năm dọc */}
            <YAxis />

            <Tooltip />

            {/* bar chart */}
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
            <Bar dataKey="amt" fill="orange">
              <LabelList dataKey="name" content={renderCustomizedLabel} />
            </Bar>

            {/* chú thích màu và giá trị */}
            <Legend verticalAlign="top" />

            {/* thanh chắn ngăn cách trục trên và trục dưới */}
            <ReferenceLine y={0} stroke="#000" />

            <Brush dataKey="name" height={30} stroke="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AppBarChart;
