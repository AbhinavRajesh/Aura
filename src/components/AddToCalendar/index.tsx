import { useState } from "react";
import { DatePicker, Modal, Input } from "antd";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

const { TextArea } = Input;

const AddToCalendar = () => {
  const { firstName } = useUser();
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(2);

  const moodIcons = [
    {
      icon: "🙁",
      text: "Rough day",
    },
    {
      icon: "😐",
      text: "Not good",
    },
    {
      icon: "🙂",
      text: "Not bad",
    },
    {
      icon: "😄",
      text: "Good",
    },
    {
      icon: "🤗",
      text: "Great!",
    },
  ];

  return (
    <>
      <div className="p-12 bg-white rounded shadow-md flex flex-col items-center">
        <h3 className="font-bold text-4xl">
          Hey,{" "}
          <span className="text-blue-600 hover:text-blue-500 font-semibold">
            {firstName} 👋
          </span>
        </h3>
        <p className="text-lg mt-4">How is your day going?</p>
        <button
          className="px-4 py-2 mt-4 bg-blue-600 hover:bg-blue-500 rounded text-white"
          onClick={() => setModalVisibility(true)}
        >
          Add Mood to calendar
        </button>
      </div>
      <Modal
        visible={modalVisibility}
        onCancel={() => setModalVisibility(false)}
        footer={false}
        title={[<span>Add Mood to calendar</span>]}
      >
        <div className="flex flex-col">
          <p className="font-semibold my-2 text-base">Select Date</p>
          <DatePicker defaultValue={moment()} format="DD/MM/YYYY" />
          <p className="font-semibold my-2 text-base">How was your day?</p>
          <div className="grid grid-cols-5">
            {moodIcons.map((icon, i) => (
              <div
                className="flex flex-col items-center justify-between"
                onClick={() => setSelected(i)}
              >
                <span
                  className={`${selected === i ? "text-2xl" : "text-base"}`}
                >
                  {icon.icon}
                </span>
                <span className={`${selected === i && "font-bold"}`}>
                  {icon.text}
                </span>
              </div>
            ))}
          </div>
          <p className="font-semibold my-2 text-base">Note:</p>
          <TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder={`Maybe add why your day was ${
              selected < 2 ? "bad" : "good"
            }`}
          />
          <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded mt-4">
            Add Mood
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddToCalendar;
