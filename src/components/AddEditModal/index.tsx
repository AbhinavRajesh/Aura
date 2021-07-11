import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "@clerk/clerk-react";
import { DatePicker, Modal, Input, message } from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";

import { UserContext } from "../../context/UserContext";
import { User } from "../../types";
import { db } from "../../utils/firebase";

const { TextArea } = Input;

interface Props {
  modalVisibility: boolean;
  setModalVisibility: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  editNote?: string;
  editDate?: string;
  editMood?: number;
}

const EditModal = ({
  modalVisibility,
  setModalVisibility,
  isEdit,
  editMood,
  editNote,
  editDate,
}: Props) => {
  const [date, setDate] = useState<moment.Moment>(moment);
  const [selected, setSelected] = useState<number>(2);
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { emailAddresses } = useUser();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (typeof editMood !== "undefined") setSelected(editMood);
    if (typeof editNote !== "undefined") setNote(editNote);
    if (typeof editDate !== "undefined")
      setDate(moment(editDate, "DD/MM/YYYY"));
  }, [editMood, editNote, editDate]);

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

  const addMood = async () => {
    try {
      setLoading(true);
      const input = {
        mood: selected,
        date: date.dayOfYear(),
        notes: note,
      };
      const updatedUser = { ...user } as User;
      if (typeof updatedUser[date.year()] === "undefined") {
        updatedUser[date.year()] = { [date.dayOfYear()]: input };
      } else {
        updatedUser[date.year()] = {
          ...updatedUser[date.year()],
          [date.dayOfYear()]: input,
        };
      }
      await db
        .collection("users")
        .doc(emailAddresses[0].emailAddress)
        .update(updatedUser);
      setUser!(updatedUser);
      message.success("Mood added succesfully! Carry on with your day :)");
      setModalVisibility(false);
    } catch (err) {
      console.error(err);
      message.error("Some error occured. Sorry for ruining your mood :(");
    }
    setLoading(false);
  };

  return (
    <Modal
      visible={modalVisibility}
      onCancel={() => setModalVisibility(false)}
      footer={false}
      title={[<span>{isEdit ? "Edit Mood" : "Add Mood to calendar"}</span>]}
      centered
    >
      <div className="flex flex-col">
        {!isEdit && (
          <>
            <p className="font-semibold my-2 text-base">Select Date</p>
            <DatePicker
              defaultValue={moment()}
              format="DD/MM/YYYY"
              onChange={(val) => setDate(val as moment.Moment)}
            />
          </>
        )}
        <p className="font-semibold my-2 text-base">How was your day?</p>
        <div className="grid grid-cols-5">
          {moodIcons.map((icon, i) => (
            <div
              className="flex flex-col items-center justify-between"
              onClick={() => setSelected(i)}
              key={i}
            >
              <span className={`${selected === i ? "text-2xl" : "text-base"}`}>
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
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          className={`px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded mt-4 ${
            loading && "cursor-not-allowed opacity-50"
          }`}
          onClick={() => addMood()}
        >
          {loading && <LoadingOutlined />} {isEdit ? "Edit" : "Add"} Mood
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
