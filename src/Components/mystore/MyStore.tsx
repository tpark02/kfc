import React, { useEffect, useState } from "react";
import { getMyStore } from "../../util/MyStoreUtil";
import { useSquadStore } from "../../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { MyStorePlayer } from "../../types/Player";

const MyStore: React.FC = () => {
  const { myUserId } = useSquadStore(
    (s) => ({
      myUserId: s.myUserId,
    }),
    shallow
  );

  const [myStoreData, setMyStoreData] = useState<MyStorePlayer[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const storeData: MyStorePlayer[] = await getMyStore(myUserId);
      // TODO: set state with storeData
      if (Object.values(storeData).length > 0) {
        console.log("my store data - ", storeData);
        setMyStoreData(storeData);
      } else alert("No my store data found");
    };
    fetchData();
  }, [myUserId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        outline: "1px solid gray",
        borderRadius: "8px",
        width: "90%",
        margin: "20px",
      }}
    >
      {myStoreData && myStoreData.map((d) => {
        return <div key={d.id}>
          {d.name}{d.ovr}
        </div>;
      })}
    </div>
  );
};

export default MyStore;
