import { PieChart, Pie, Cell } from "recharts";

interface MetricChartProps {
  value: number;
}

export function MetricChart({ value }: MetricChartProps) {
  const data = [
    { name: "Achieved", value: value },
    { name: "Remaining", value: 100 - value },
  ];
  
  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-mw-orange">
        {value}%
      </div>
      <PieChart width={48} height={48}>
        <Pie
          data={data}
          cx={20}
          cy={20}
          innerRadius={16}
          outerRadius={22}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          stroke="none"
        >
          <Cell fill="#FF6B00" />
          <Cell fill="rgba(255, 255, 255, 0.1)" />
        </Pie>
      </PieChart>
    </div>
  );
}
