import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import _ from "lodash";
import { Player } from "../types/Player";
import { useDrag } from "react-dnd";
import { ResponseSearch } from "../types/Response";

const DraggablePlayer = ({
  player,
  color,
  onStartDrag,
}: {
  player: Player;
  color: string;
  onStartDrag: () => void;
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
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      onMouseDown={onStartDrag}
    >
      <div style={{ backgroundColor: color, width: "50px" }}>{player.pos}</div>
      <div>{player.name}</div>
    </div>
  );
};

interface SearchPlayerProp {
  country: string;
  league: string;
  club: string;
  pos: string;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  listRef: React.RefObject<HTMLDivElement | null>;
}

const SearchPlayer = forwardRef<HTMLDivElement, SearchPlayerProp>(
  ({ country, league, club, pos, setIsDragging, listRef }, ref) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Player[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchPlayers = useCallback(
      async (q: string, pageNumber: number) => {
        let localPos = "";
        if (q.trim().length < 2) {
          localPos = pos;
        }

        try {
          setLoading(true);
          const response = await axios.post<ResponseSearch>(
            "http://localhost:8080/api/squadsearch",
            {
              page: pageNumber,
              name: q.trim().length >= 2 ? q : "",
              country,
              league,
              club,
              pos: localPos,
            }
          );

          if (response.data && response.data.content) {
            if (pageNumber === 0) {
              setResults(response.data.content);
            } else {
              setResults((prev) => {
                const newResults = [...prev, ...response.data.content];
                const uniqueResults = Array.from(
                  new Map(newResults.map((item) => [item.id, item])).values()
                );
                return uniqueResults;
              });
            }
            setHasMore(response.data.content.length > 0);
          } else {
            setHasMore(false);
          }
        } catch (err) {
          console.error(err);
          setHasMore(false);
        } finally {
          setLoading(false);
        }
      },
      [country, league, club, pos]
    );

    // 초기 또는 query 변경 시
    useEffect(() => {
      const handler = _.debounce(() => {
        setPage(0);
        fetchPlayers(query, 0);
      }, 300);

      handler();
      return () => handler.cancel();
    }, [query, fetchPlayers]);

    // 스크롤 내려갈 때
    useEffect(() => {
      const handleScroll = () => {
        const el = listRef.current;
        if (!el || loading || !hasMore) return;

        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
          setPage((prev) => {
            const nextPage = prev + 1;
            fetchPlayers(query, nextPage);
            return nextPage;
          });
        }
      };

      const current = listRef.current;
      current?.addEventListener("scroll", handleScroll);
      return () => current?.removeEventListener("scroll", handleScroll);
    }, [fetchPlayers, loading, hasMore, query]);

    // 컴포넌트 처음 mount될 때
    useEffect(() => {
      setPage(0);
      fetchPlayers("", 0);
    }, [fetchPlayers]);

    return (
      <div id="search-player-root" ref={ref}>
        <TextField
          id="label"
          fullWidth
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (listRef.current) listRef.current.scrollTop = 0; // 검색창 입력하면 스크롤도 위로
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
        />
        <div
          id="search-player-list"
          ref={listRef}
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            marginTop: "1rem",
            padding: "0.5rem",
          }}
        >
          {results.map((player) => {
            const pos = player.pos;
            let c = "black";
            if (pos.includes("ST") || pos.includes("W")) c = "red";
            else if (pos.includes("M")) c = "orange";
            else if (pos.includes("B")) c = "blue";
            else if (pos.includes("G")) c = "orange";

            return (
              <div key={player.id}>
                <DraggablePlayer
                  player={player}
                  color={c}
                  onStartDrag={() => setIsDragging(true)}
                />
              </div>
            );
          })}

          {loading && (
            <div style={{ color: "white", textAlign: "center" }}>
              Loading...
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default SearchPlayer;
