import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { League } from "../types/league";
import { LeaguePage } from "../types/leaguePage";
import axiosInstance, { isAxiosError } from "../app/axiosInstance";

interface LeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLeague: (leagues: League[]) => void;
  prevList: League[];
}

const LeagueModal: React.FC<LeagueModalProps> = ({
  isOpen,
  onClose,
  onSelectLeague,
  prevList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leagues, setLeagues] = useState<League[]>([]);

  useEffect(() => {
    axiosInstance
      .get<LeaguePage>("/leagues")
      .then((response) => {
        setLeagues(response.data.content);
      })
      .catch((err: unknown) => {
        if (isAxiosError(err)) {
          console.error("Axios error:", err.response?.data);
        } else {
          console.error("Unknown error:", err);
        }
      });
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ mt: 2 }}>
      {/* ✅ 검색 입력창 */}
      <TextField
        fullWidth
        placeholder="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            color: "white", // ✅ 입력 텍스트 색
            "& input::placeholder": {
              color: "gray", // ✅ placeholder 색
              opacity: 1, // ✅ 일부 브라우저에서 회색 제대로 보이게
            },
            "& fieldset": {
              borderColor: "gray",
            },
            "&:hover fieldset": {
              borderColor: "gray",
            },
            "&.Mui-focused fieldset": {
              borderColor: "gray",
            },
          },
        }}
      />

      {/* ✅ 리그 리스트 */}
      {filteredLeagues.map((league) => (
        <Box
          className="filter-box"
          key={league.id}
          display="flex"
          alignItems="center"
          mb={1}
          style={{ cursor: "pointer" }}
          onClick={() => {
            const alreadySelected = prevList.some(
              (c) => c.name === league.name
            );
            if (alreadySelected) return;

            const newList = [...prevList, league];
            onSelectLeague(newList);
          }}
        >
          <img
            src={league.url !== "" ? league.url : "../../img/fallback.png"}
            alt={league.name}
            style={{
              width: "8%",
              height: "8%",
              marginRight: 8,
              backgroundColor: "white", // ✅ add white background
            }}
            onError={(e) => {
              e.currentTarget.onerror = null; // 무한 루프 방지
              e.currentTarget.src = "../../img/fallback.png"; // 대체 이미지 경로
            }}
          />
          <Typography>{league.name}</Typography>
        </Box>
      ))}
      {/* ✅ 취소 버튼 */}
      {/* <Button
        variant="contained"
        color="secondary"
        onClick={onClose}
        sx={{ marginLeft: 1 }}
      >
        close
      </Button> */}
    </Box>
  );
};

export default LeagueModal;
