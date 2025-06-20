import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../app/axiosInstance";
import _ from "lodash";
import { Player } from "../../types/player";
import { ResponseSearch } from "../../types/response";
import { getImgByCountryName } from "../../data/countryData";
import { getOvrColor, getPosColor } from "../../util/util";
import RadarStatChart from "../players/RadarStatsChart";
import { useLoadingSpinnerStore } from "../../store/useLoadingSpinnerStore";

import "../../style/SearchPlayer.css";

interface SearchPlayerProp {
  country: string;
  league: string;
  club: string;
  pos: string;
  listRef: React.RefObject<HTMLDivElement | null>;
  selectedDropZone: { index: number };
}

const SearchPlayer = forwardRef<HTMLDivElement, SearchPlayerProp>(
  (
    {
      country,
      league,
      club,
      pos,
      listRef,
      selectedDropZone,
    },
    ref
  ) => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Player[]>([]);
    const [, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [hoveredPlayer, setHoveredPlayer] = useState<Player | null>(null);

    const fetchPlayers = useCallback(
      async (q: string, pageNumber: number) => {
        console.log("🔥 fetchPlayers called with query:", q);

        try {
          useLoadingSpinnerStore.getState().setIsLoading(true);
          const response = await axiosInstance.post<ResponseSearch>(
            "/squadsearch",
            {
              page: pageNumber,
              name: q.trim().length >= 2 ? q : "",
              country,
              league,
              club,
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
          useLoadingSpinnerStore.getState().setIsLoading(false);
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
    }, [fetchPlayers, loading, hasMore, query, listRef]);

    // 컴포넌트 처음 mount될 때
    useEffect(() => {
      setPage(0);
      fetchPlayers("", 0);
    }, [fetchPlayers]);

    const displayPlayerSpec = (p: Player | null) => {
      return (
        <>
          <div className="search-player-mid">
            <RadarStatChart
              pac={p ? p.pac : 0}
              sho={p ? p.sho : 0}
              pas={p ? p.pas : 0}
              dri={p ? p.dri : 0}
              def={p ? p.def : 0}
              phy={p ? p.phy : 0}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                margin: "0 0 10px 0",
                position: "relative",
                width: "90%",
                height: "50px",
                // outline: "1px solid gray",
                borderRadius: "8px",
              }}
            >
              {p ? p.name : "N/A"}
            </div>
            <div className="search-player-src-group">
              <div className="search-player-src-item">
                {getImgByCountryName(
                  p?.nation ?? "",
                  selectedDropZone?.index,
                  45,
                  35
                )}
              </div>
              <div className="search-player-src-item">
                <div
                  style={{
                    backgroundColor: getPosColor(p ? p.pos : ""),
                    width: "35px",
                    height: "25px",
                    padding: "5px",
                    borderRadius: "8px",
                    outline: "1px solid gray",
                  }}
                >
                  {p ? p.pos : "N/A"}
                </div>
              </div>
              <div
                className="search-player-src-item"
                style={{
                  backgroundColor: getOvrColor(p ? p.ovr : 0),
                  width: "35px",
                  height: "25px",
                  padding: "5px",
                  borderRadius: "8px",
                  outline: "1px solid gray",
                }}
              >
                {p ? p.ovr : 0}
              </div>
            </div>
          </div>
        </>
      );
    };

    return (
      <div className="search-player-root">
        <div className="search-player">
          {(() => {
            // const p = dropPlayers[selectedDropZone?.index]
            //   ? dropPlayers[selectedDropZone.index]
            //   : null;
            return displayPlayerSpec(p);
          })()}
          <div style={{ padding: "10px" }}></div>
          {(() => {
            return displayPlayerSpec(hoveredPlayer);
          })()}
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
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },
            }}
            style={{
              width: "100%",
              outline: "1px solid gray",
              // borderRadius: "8px",
            }}
          />
          <div id="search-player-list" ref={listRef}>
            {results.map((player) => {
              const c = getPosColor(player.pos);
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
                  }}
                  sx={{ color: "white" }}
                >
                  <div className="squad-team-player" key={player.id}>
                    <div
                      style={{
                        flex: "2",
                        height: "25px",
                        backgroundColor: c,
                      }}
                    >
                      {player.pos}
                    </div>
                    <div
                      style={{
                        flex: "8",
                        height: "25px",
                      }}
                    >
                      {player.name}
                    </div>
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
