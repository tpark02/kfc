import axiosInstance from "../../app/axiosInstance";
import { useState } from "react";
import { useSquadStore } from "../../store/useSquadStore";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useSnackbarStore } from "../../store/userSnackBarStore";

export default function CreateSeasonForm({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [name, setName] = useState("");

  const { HasRedCard, myUserId, mySelectedClubId, setJoinedSeasonId } =
    useSquadStore(
      (s) => ({
        HasRedCard: s.HasRedCard,
        myUserId: s.myUserId,
        mySelectedClubId: s.mySelectedClubId,
        setJoinedSeasonId: s.setJoinedSeasonId,
      }),
      shallow
    );

  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name) return;
    try {
      const response = await axiosInstance.post("/season/create", {
        name,
        userId: myUserId,
        clubId: mySelectedClubId,
      });

      if (!response.data?.error) {
        onCreated();
        setJoinedSeasonId(response.data.id);

        useSnackbarStore.getState().setSnackbar(response.data.msg);

        // ✅ 성공한 시즌으로 이동
        navigate(`/season/${response.data.id}`);
      } else {
        useSnackbarStore.getState().setSnackbar(response.data.error);

      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        useSnackbarStore.getState().setSnackbar("요청 실패: " + error.message);
      } else {
        useSnackbarStore.getState().setSnackbar("알 수 없는 오류가 발생했습니다.");
      }

    }

    setName("");
  };

  // const isdRedCard = selectedMyPlayers.slice(0, 10).some((p) => p.redCard > 0);

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
        disabled={HasRedCard}
      >
        Create
      </button>
    </div>
  );
}
