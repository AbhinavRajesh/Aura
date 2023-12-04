import { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import AddEditModal from "../AddEditModal";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import { getEmoji } from "../../utils/helper";

interface ModalData {
  notes: string;
  moodNumber: number;
}

const AddToCalendar = () => {
  const { user: clerkUser } = useUser();
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { user } = useContext(UserContext);

  const getModalData = () => {
    const date = moment();
    const dayOfYear = date.dayOfYear();
    const year = date.year();
    if (
      typeof user![year] !== "undefined" &&
      typeof user![year][dayOfYear] !== "undefined"
    ) {
      const mood = getEmoji(user![year][dayOfYear]?.mood);
      setModalData({
        notes: user![year][dayOfYear].notes,
        moodNumber: mood.mood,
      });
      setIsEdit(true);
    } else {
      setModalData({
        notes: "",
        moodNumber: 2,
      });
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (user !== null) getModalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className="py-8 px-4 mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28 md:p-12 bg-white rounded shadow-md flex flex-col items-center">
        <h3 className="font-bold text-xl md:text-4xl text-center">
          Hey,{" "}
          <span className="text-blue-600 hover:text-blue-500 font-semibold">
            {clerkUser?.firstName} 👋
          </span>
        </h3>
        <p className="text-base md:text-lg mt-4">
          {new Date().getHours() < 17
            ? "How is your day going?"
            : "How was your day today?"}
        </p>
        <button
          className="px-4 py-2 mt-4 bg-blue-600 hover:bg-blue-500 rounded text-white"
          onClick={() => setModalVisibility(true)}
        >
          {isEdit ? "Edit Mood" : "Add Mood to calendar"}
        </button>
      </div>
      <AddEditModal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        isEdit={isEdit}
        editNote={modalData?.notes}
        editMood={modalData?.moodNumber}
      />
    </>
  );
};

export default AddToCalendar;
