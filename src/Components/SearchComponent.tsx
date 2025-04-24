import React, { useState, useEffect, useMemo } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import _ from "lodash";
import { Player } from "../types/Player";
import { useDrag } from "react-dnd";

const DraggablePlayer = ({
  player,
  color,
}: {
  player: Player;
  color: string;
}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "PLAYER",
    item: player,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className="squad-team-player"
      key={player.id}
      ref={(node) => {
        dragRef(node);
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <div style={{ backgroundColor: color, width: "50px" }}>{player.pos}</div>
      <div>{player.name}</div>
    </div>
  );
};

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Player[]>([]);

  const debouncedSearch = useMemo(
    () =>
      _.debounce(async (q: string) => {
        if (q.length < 2) {
          setResults([]); // 2글자 미만이면 초기화
          return;
        }
        try {
          const res = await axios.get(
            `http://localhost:8080/api/search?query=${encodeURIComponent(q)}`
          );
          setResults(res.data);
        } catch (err) {
          console.error(err);
        }
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  return (
    <>
      <TextField
        fullWidth
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div>
        {results &&
          results.map((player) => {
            const pos = player.pos;
            let c = "black";
            if (pos.includes("ST") || pos.includes("W")) c = "red";
            else if (pos.includes("M")) c = "yellow";
            else if (pos.includes("B")) c = "blue";
            else if (pos.includes("G")) c = "orange";
            return (
              <div key={player.id}>
                <DraggablePlayer key={player.id} player={player} color={c} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SearchComponent;
