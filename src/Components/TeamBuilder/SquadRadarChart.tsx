import { useId } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  LabelList,
  Rectangle,
} from "recharts";

import { type BarRectangleItem } from "recharts/types/cartesian/Bar";
import { Player } from "../../types/Player";

interface SquadBarChartProps {
  players: Record<number, Player | null>;
}

const SquadBarChart: React.FC<SquadBarChartProps> = ({ players }) => {
  function BarGradient(props: BarRectangleItem) {
    const id = useId();
    const gradientId = `gradient-${id}`;
    const clipPathId = `clipPath-${id}`;

    return (
      <>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="green" />
            <stop offset="80%" stopColor="orange" />
            <stop offset="100%" stopColor="red" />
          </linearGradient>

          <clipPath id={clipPathId}>
            <Rectangle {...props} />
          </clipPath>
        </defs>

        <rect
          x={props.x}
          width={props.width}
          height={props.background?.height}
          fill={`url(#${gradientId})`}
          y={props.background?.y}
          clipPath={`url(#${clipPathId})`}
        />
      </>
    );
  }
  const getAverage = (arr: number[]) =>
    arr.length
      ? Math.round(arr.reduce((sum, val) => sum + (val || 0), 0) / arr.length)
      : 0;

  const values = Object.values(players).filter(Boolean) as Player[];

  const metrics = {
    SPD: getAverage(values.map((p) => p.pac)),
    ATK: getAverage(values.map((p) => p.sho)),
    DEF: getAverage(values.map((p) => p.def)),
    STA: getAverage(values.map((p) => p.stamina)),
    TC:
      Math.min(
        Math.max(
          ...Object.values(
            values.reduce((acc, p) => {
              if (p.team) acc[p.team] = (acc[p.team] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ),
          0
        ),
        10
      ) * 10,
  };

  const data = Object.entries(metrics).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <ResponsiveContainer height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <Bar
          dataKey="value"
          fill="url(#barGradient)"
          shape={<BarGradient />}
          activeBar={<BarGradient />}
          barSize={9}
        >
          <LabelList dataKey="value" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SquadBarChart;
