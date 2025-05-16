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
}

const fallbackSrc = "/img/avatar.jpg";

const CroppedAvatar: React.FC<CroppedAvatarProps> = ({
  src,
  width = 80,
  height = 80,
  offsetX = 30,
  offsetY = 0,
  borderRadius = "8px",
  selected = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const finalSrc = useFallback || !src ? fallbackSrc : src;
  // console.log(
  //   "🧪 finalSrc:",
  //   finalSrc,
  //   "| isLoaded:",
  //   isLoaded,
  //   "| useFallback:",
  //   useFallback
  // );
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        console.warn("Image load timeout, using fallback.");
        setUseFallback(true);
        setIsLoaded(true);
      }
    }, 2000); // 3 seconds max load time

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div
      className={`player${selected ? " selected" : ""}`}
      style={{
        width,
        height,
        overflow: "hidden",
        borderRadius,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      {!isLoaded && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            zIndex: 1,
          }}
        />
      )}

      {finalSrc && (
        <img
          src={finalSrc}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (!useFallback) setUseFallback(true);
            else setIsLoaded(true);
          }}
          alt="avatar"
          style={{
            display: isLoaded ? "block" : "none",
            position: "absolute",
            top: `-${offsetY}px`,
            left: `-${offsetX}px`,
            width: width * 1.5,
            height: height * 1.5,
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
};

export default CroppedAvatar;
