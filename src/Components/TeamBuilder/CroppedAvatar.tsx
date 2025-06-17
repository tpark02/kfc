import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface CroppedAvatarProps {
  src: string;
  width?: number;
  height?: number;
  offsetX?: number;
  offsetY?: number;
  borderRadius?: string;
  selected?: boolean;
  scale?: number; // 추가: 이미지 크기 조정 비율
}

const fallbackSrc = "/img/avatar.jpg";

const CroppedAvatar: React.FC<CroppedAvatarProps> = ({
  src,
  width = 80,
  height = 80,
  offsetX = 0,
  offsetY = 0,
  borderRadius = "8px",
  selected = false,
  scale = 1.0, // default scaling
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [finalSrc, setFinalSrc] = useState<string>("");

  useEffect(() => {
    setIsLoaded(false); // 새로운 이미지 로딩 시작

    const rawSrc = src && src.trim() !== "" ? src : fallbackSrc;
    const cacheBustedSrc = `${rawSrc}?v=${Date.now()}`; // 캐시 무효화

    const img = new Image();
    img.src = cacheBustedSrc;

    img.onload = () => {
      setFinalSrc(cacheBustedSrc);
      setIsLoaded(true);
    };

    img.onerror = () => {
      setFinalSrc(`${fallbackSrc}?v=${Date.now()}`);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div
      // className={`player${selected ? " selected" : ""}`}
      // style={{
      //   width,
      //   height,
      //   overflow: "hidden",
      //   borderRadius,
      //   position: "relative",
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   backgroundColor: "gray",
      // }}
    >
      {!isLoaded && (
        <CircularProgress
          size={24}
          style={{ position: "absolute", zIndex: 1 }}
        />
      )}

      {isLoaded && finalSrc && (
        <img
          key={finalSrc}
          src={finalSrc}
          alt="avatar"
          style={{
            // position: "absolute",
            // top: `-${offsetY}px`,
            // left: `-${offsetX}px`,
            width: "100%",
            height: "100%",
            // objectFit: "cover",
          }}
        />
      )}
    </div>
  );
};

export default CroppedAvatar;
