// styles.ts 또는 컴포넌트 상단에 함께 정의
export const outerCardStyle = (isDragging: boolean) => ({
  opacity: isDragging ? 0.5 : 1,
  cursor: "grab",
  "&:active": {
    cursor: "grabbing",
  },
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: "#1e1e1e",
  color: "#fff",
  borderRadius: 2,
  outline: "1px solid gray",
  padding: "4px 8px",
  margin: "0 0 10px 0",
  height: "auto",
});

export const rowStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: 0.5,
  overflow: "hidden",
  minHeight: "32px",
  padding: "0 4px",
  flex: 1,    
};

export const posStyle = (posColor: string) => ({
  flex: 1,
  color: posColor,
  fontSize: 12,
  minWidth: 24,
  textAlign: "left",
});

export const nameBoxStyle = {
  flex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const firstNameStyle = {
  fontWeight: 600,
  fontSize: 13,
};

export const lastNameStyle = {
  fontSize: 12,
};

export const ovrStyle = {
  flex: 1,
  fontSize: 13,
  minWidth: 30,
  textAlign: "right",
};
