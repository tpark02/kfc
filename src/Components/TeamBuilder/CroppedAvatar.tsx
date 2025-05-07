import React from "react";

interface CroppedAvatarProps {
  src: string;
  width?: number;
  height?: number;
  offsetX?: number;
  offsetY?: number;
  borderRadius?: string;
  selected?: boolean;
}

const CroppedAvatar: React.FC<CroppedAvatarProps> = ({
  src,
  width = 80,
  height = 80,
  offsetX = 30,
  offsetY = 0,
  borderRadius = "8px",
  selected = false,
}) => {
  return (
    <div
      className={`player${selected ? " selected" : ""}`}
      style={{
        width,
        height,
        overflow: "hidden",
        borderRadius,
        position: "relative",
      }}
    >
      <img
        src={src || "/img/avatar.jpg"}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/img/avatar.jpg";
        }}
        alt="avatar"
        style={{
          position: "absolute",
          top: `-${offsetY}px`,
          left: `-${offsetX}px`,
          width: width * 1.5,
          height: height * 1.5,
          objectFit: "cover",
        }}
        loading="lazy"
      />
    </div>
  );
};

export default CroppedAvatar;
