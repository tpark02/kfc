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
  scale?: number;
  fallbackSrc: string;
  fallBackWidth: number;
  fallBackHeight: number;
  aspectRatio: number;
}

const CroppedAvatar: React.FC<CroppedAvatarProps> = ({
  src,
  width = 80,
  height = 80,
  borderRadius = "8px",
  fallbackSrc = "/img/avatar.jpg",
  fallBackWidth = 0,
  fallBackHeight = 0,
  aspectRatio = 1,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [finalSrc, setFinalSrc] = useState<string>("");

  useEffect(() => {
    setIsLoaded(false);
    const rawSrc = src && src.trim() !== "" ? src : fallbackSrc;
    const cacheBustedSrc = `${rawSrc}?v=${Date.now()}`;

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

  const finalWidth =
    width ?? (height && aspectRatio ? height * aspectRatio : 80);
  const finalHeight =
    height ?? (width && aspectRatio ? width / aspectRatio : 80);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      {!isLoaded && (
        <CircularProgress
          size={24}
          style={{ zIndex: 1, width: "50px", height: "50px" }}
        />
      )}

      {isLoaded && finalSrc && (
        <img
          key={finalSrc}
          src={finalSrc}
          alt="avatar"
          style={{
            width: finalSrc.includes("fallback")
              ? `${fallBackWidth}px`
              : `${finalWidth}px`,
            height: finalSrc.includes("fallback")
              ? `${fallBackHeight}px`
              : `${finalHeight}px`,
            objectFit: "cover",
            borderRadius: borderRadius,
          }}
        />
      )}
    </div>
  );
};

export default CroppedAvatar;
