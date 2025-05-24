import axios from "axios";
import { useState } from "react";
import { useSquadStore } from "../../store/useSquadStore";
import { Snackbar } from "@mui/material";

export default function CreateSeasonForm({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const { myUserId } = useSquadStore();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCreate = async () => {
    if (!name) return;
    await axios
      .post("http://localhost:8080/season/create", {
        name,
        userId: myUserId,
      })
      .then((response) => {
        console.log(response.data);
        setSnackbarMessage(response.data.msg);
        setSnackbarOpen(true);
        if (!response.data?.error) {
          onCreated(); // 성공 시 콜백
        }
      })
      .catch((error) => {
        setSnackbarMessage("요청 실패: " + error.message);
        setSnackbarOpen(true);
      });
    setName("");
    onCreated(); // 생성 후 새로고침 or 목록 업데이트
  };

  return (
    <div className="flex gap-2 my-4">
      <input
        type="text"
        placeholder="시즌 이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-1 rounded"
      />
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Create
      </button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
}
