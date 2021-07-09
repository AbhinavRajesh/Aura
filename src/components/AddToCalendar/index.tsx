import { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { UserContext } from "../../context/UserContext";

import AddEditModal from "../AddEditModal";

const AddToCalendar = () => {
  const { firstName } = useUser();
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  const { user, getUser } = useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      getUser!();
    }
  }, [getUser, user]);

  return (
    <>
      <div className="py-8 px-4 mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28 md:p-12 bg-white rounded shadow-md flex flex-col items-center">
        <h3 className="font-bold text-xl md:text-4xl text-center">
          Hey,{" "}
          <span className="text-blue-600 hover:text-blue-500 font-semibold">
            {firstName} 👋
          </span>
        </h3>
        <p className="text-base md:text-lg mt-4">How is your day going?</p>
        <button
          className="px-4 py-2 mt-4 bg-blue-600 hover:bg-blue-500 rounded text-white"
          onClick={() => setModalVisibility(true)}
        >
          Add Mood to calendar
        </button>
      </div>
      <AddEditModal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        isEdit={false}
      />
    </>
  );
};

export default AddToCalendar;
