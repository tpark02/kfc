import { useState } from "react";
import axios from "axios";

export default function CreateSeasonForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    if (!name) return;
    await axios.post("http://localhost:8080/season/create", null, {
      params: { name },
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
        시즌 만들기
      </button>
    </div>
  );
}
