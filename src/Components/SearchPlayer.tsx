import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import _ from "lodash";
import { Player } from "../types/Player";
import { ResponseSearch } from "../types/Response";

interface SearchPlayerProp {
  country: string;
  league: string;
  club: string;
  pos: string;
  listRef: React.RefObject<HTMLDivElement | null>;
  dropPlayers: { [idx: number]: Player | null };
  selectedDropZone: { index: number; pos: string };
  setDropPlayers: React.Dispatch<
    React.SetStateAction<{
      [idx: number]: Player | null;
    }>
  >;
  setSnackbarMessage: (formation: string) => void;
  setSnackbarOpen: (isOpen: boolean) => void;
  setTeamOvr: (teamOvr: number) => void;
}

const SearchPlayer = forwardRef<HTMLDivElement, SearchPlayerProp>(
  (
    {
      country,
      league,
      club,
      pos,
      listRef,
      dropPlayers,
      selectedDropZone,
      setDropPlayers,
      setSnackbarMessage,
      setSnackbarOpen,
      setTeamOvr,
    },
    ref
  ) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Player[]>([]);
    const [, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [hoveredPlayer, setHoveredPlayer] = useState<Player | null>(null);
    // const convertedDropPlayers: { [index: number]: Player | null } = {};

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
      <div>
        <div className="search-player-src">
          {(() => {
            const p = dropPlayers[selectedDropZone?.index]
              ? dropPlayers[selectedDropZone.index]
              : null;
            return (
              p && (
                <div style={{ color: "white", marginBottom: "1rem" }}>
                  <div>이름: {p.name}</div>
                  <div>국가: {p.nation}</div>
                  <div>포지션: {p.pos}</div>
                  <div>OVR: {p.ovr}</div>
                </div>
              )
            );
          })()}
        </div>
        <div className="search-player-desc">
          {hoveredPlayer && (
            <div style={{ color: "white", marginBottom: "1rem" }}>
              <div>이름: {hoveredPlayer.name}</div>
              <div>국가: {hoveredPlayer.nation}</div>
              <div>포지션: {hoveredPlayer.pos}</div>
              <div>OVR: {hoveredPlayer.ovr}</div>
            </div>
          )}
        </div>
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
              let c = "black";
              if (pos.includes("ST") || pos.includes("W")) c = "red";
              else if (pos.includes("M")) c = "orange";
              else if (pos.includes("B")) c = "blue";
              else if (pos.includes("G")) c = "orange";

              return (
                <Button
                  key={player.id}
                  onMouseEnter={() => setHoveredPlayer(player)}
                  onMouseLeave={() => setHoveredPlayer(null)}
                  onClick={() => {
                    console.log(
                      "🔥 선택된 dropzone index:",
                      selectedDropZone.index
                    );
                    console.log("🔥 넣을 player:", player);

                    const repeatedPlayer = Object.values(dropPlayers).some(
                      (d) => d && d.id === player.id
                    );

                    if (repeatedPlayer) {
                      setSnackbarMessage("You already selected " + player.name);
                      setSnackbarOpen(true);
                      return;
                    }

                    setDropPlayers((prev) => ({
                      ...prev,
                      [selectedDropZone.index]: player,
                    }));

                    let teamOvr = 0;
                    Object.values(dropPlayers).forEach((d) => {
                      if (d) teamOvr += d.ovr;
                    });
                    teamOvr /= 11;
                    teamOvr = Math.ceil(teamOvr);
                    setTeamOvr(teamOvr);
                  }}
                >
                  <div className="squad-team-player" key={player.id}>
                    <div style={{ backgroundColor: c, width: "50px" }}>
                      {player.pos}
                    </div>
                    <div>{player.name}</div>
                  </div>
                </Button>
              );
            })}

            {loading && (
              <div style={{ color: "white", textAlign: "center" }}>
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default SearchPlayer;
