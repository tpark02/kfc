import { useEffect, useId } from "react";
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
import { shallow } from "zustand/shallow";

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
  } = useSquadStore(
    (s) => ({
      myTeamClubCohesion: s.myTeamClubCohesion,
      myTeamPace: s.myTeamPace,
      myTeamAttack: s.myTeamAttack,
      myTeamDefense: s.myTeamDefense,
      myTeamStamina: s.myTeamStamina,
    }),
    shallow
  );

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

  const safeMetric = (val: number | undefined) =>
    typeof val === "number" && Number.isFinite(val) ? val : 0;

  const metrics = {
    SPD: safeMetric(myTeamPace),
    ATK: safeMetric(myTeamAttack),
    DEF: safeMetric(myTeamDefense),
    STA: safeMetric(myTeamStamina),
    TC: safeMetric(myTeamClubCohesion),
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
