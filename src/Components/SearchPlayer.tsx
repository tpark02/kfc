import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  forwardRef,
} from "react";
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

interface SearchPlayerProp {
  country: string;
  league: string;
  club: string;
  pos: string;
}

const SearchPlayer = forwardRef<HTMLDivElement, SearchPlayerProp>(
  ({ country, league, club, pos }, ref) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Player[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchPlayers = useCallback(
      async (q: string, pageNumber: number) => {
        if (q.length < 2) {
          setResults([]);
          setPage(0);
          setHasMore(false);
          return;
        }
        try {
          setLoading(true);
          const response = await axios.post<ResponseSearch>(
            "http://localhost:8080/api/squadsearch",
            {
              page: pageNumber,
              name: q,
              country,
              league,
              club,
              pos,
              q,
            }
          );

          if (response.data && response.data.content) {
            if (pageNumber === 0) {
              setResults(response.data.content);
            } else {
              setResults((prev) => [...prev, ...response.data.content]);
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

    useEffect(() => {
      const handler = _.debounce(() => {
        if (query.trim() === "") {
          setResults([]);
          setPage(0);
          setHasMore(false);
          return;
        }
        setPage(0);
        fetchPlayers(query, 0);
      }, 300);

      handler();
      return () => handler.cancel();
    }, [query, fetchPlayers]);

    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleScroll = () => {
        const el = listRef.current;
        if (!el || loading || !hasMore) return;

        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
          setPage((prev) => {
            const next = prev + 1;
            fetchPlayers(query, next);
            return next;
          });
        }
      };

      const current = listRef.current;
      current?.addEventListener("scroll", handleScroll);
      return () => current?.removeEventListener("scroll", handleScroll);
    }, [fetchPlayers, loading, hasMore, query]);

    return (
      <div id="search-player-root" ref={ref}>
        <TextField
          id="label"
          fullWidth
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
        />
        <div
          ref={listRef}
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            marginTop: "1rem",
            padding: "0.5rem",
          }}
        >
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
