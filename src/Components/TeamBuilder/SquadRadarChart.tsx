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
import { useSquadStore } from "../../store/useSquadStore";

// interface SquadBarChartProps {
//   players: Record<number, Player | null>;
// }

const SquadBarChart: React.FC = () => {
  const {
    myTeamClubCohesion,
    myTeamPace,
    myTeamAttack,
    myTeamDefense,
    myTeamStamina,
  } = useSquadStore();

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

  const metrics = {
    SPD: myTeamPace,
    ATK: myTeamAttack,
    DEF: myTeamDefense,
    STA: myTeamStamina,
    TC: myTeamClubCohesion,
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
