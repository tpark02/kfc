import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

import "../PlayerSpec.css";

interface PlayerStats {
  pac: number | null;
  sho: number | null;
  pas: number | null;
  dri: number | null;
  def: number | null;
  phy: number | null;
}

const RadarStatChart: React.FC<PlayerStats> = ({
  pac,
  sho,
  pas,
  dri,
  def,
  phy,
}) => {
  let data = [
    { stat: "PAC", value: pac },
    { stat: "SHO", value: sho },
    { stat: "PAS", value: pas },
    { stat: "DRI", value: dri },
    { stat: "DEF", value: def },
    { stat: "PHY", value: phy },
  ];
  return (
    <div className="player-spec-radar-chart">
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          {/* <PolarRadiusAxis angle={30} domain={[0, 100]} /> */}
          <Radar
            name="Player Stats"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarStatChart;
