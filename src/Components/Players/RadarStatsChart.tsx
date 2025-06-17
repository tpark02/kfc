import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

import { Box } from "@mui/system";
import "../../style/PlayerSpec.css";

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
  return (
    <Box className="player-spec-radar-chart">
      <ResponsiveContainer>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={[
            { stat: "PAC", value: pac },
            { stat: "SHO", value: sho },
            { stat: "PAS", value: pas },
            { stat: "DRI", value: dri },
            { stat: "DEF", value: def },
            { stat: "PHY", value: phy },
          ]}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Player Stats"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RadarStatChart;
