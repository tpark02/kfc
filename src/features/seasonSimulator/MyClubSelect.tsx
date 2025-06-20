import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";

interface MyClubSelectProp {
  selectedIdx: number;
  setIdx: (n: number) => void;
}

const MyClubSelect: React.FC<MyClubSelectProp> = ({ selectedIdx, setIdx }) => {
  const { myClubs } = useSquadStore((s) => ({ myClubs: s.myClubs }), shallow);
  return (
    <Select
      variant="outlined"
      style={{
        width: "100%",
        borderRadius: "8px",
      }}
      labelId="formation-label"
      value={selectedIdx}
      onChange={(e) => {
        setIdx(Number(e.target.value));
      }}
      sx={{
        backgroundColor: "#242424",
        color: "white",
        "& .MuiSelect-icon": {
          color: "white",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "gray",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "gray",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "gray", // ✅ This overrides the default blue border
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: "#242424",
            color: "#fff",
          },
        },
      }}
    >
      {Object.values(myClubs).map((myClub, idx) => {
        console.log("my club : ", myClub?.clubId);
        console.log("my club list : ", myClub);
        if (!myClub) return null;
        return (
          <MenuItem
            key={myClub.clubId}
            value={idx}
            sx={{
              backgroundColor: "#242424",
              color: "#fff",
            }}
          >
            <Box display="flex" alignItems="center">
              {myClub.name}
            </Box>
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default MyClubSelect;
