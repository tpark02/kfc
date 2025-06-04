import React, { forwardRef, MouseEventHandler } from "react";
import { useDrop } from "react-dnd";
import CroppedAvatar from "./CroppedAvatar";
import { Player } from "../../types/Player";
import "../DropZone.css";

interface DropZoneProp {
  grid: { gridColumn: number; gridRow: number };
  onDrop: (player: Player) => void;
  player?: Player;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
  containerClassName?: string;
}

// ✅ forwardRef로 감싸기
const DropZone = forwardRef<HTMLDivElement, DropZoneProp>(
  ({ grid, onDrop, player, onClick, children, containerClassName }, ref) => {
    const [, dropRef] = useDrop(() => ({
      accept: "PLAYER",
      drop: (player: Player) => {
        onDrop(player);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    // 내부 div에 두 개의 ref 연결: dropRef + 외부에서 받은 ref
    const divRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (divRef.current) {
        dropRef(divRef);
        if (ref) {
          if (typeof ref === "function") {
            ref(divRef.current);
          } else {
            (ref as React.RefObject<HTMLDivElement>).current = divRef.current;
          }
        }
      }
    }, [ref]);

    return (
      <div
        ref={divRef}
        style={{
          gridColumn: grid.gridColumn,
          gridRow: grid.gridRow,
        }}
        onClick={onClick}
        className={containerClassName}
      >
        <div className="dropzone-button">
          <CroppedAvatar src={player?.img ?? ""} />
          {children}
        </div>
      </div>
    );
  }
);

export default DropZone;
