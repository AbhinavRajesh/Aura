import { useContext, useState, useEffect } from "react";
import { Select, Tooltip, Modal } from "antd";
import moment from "moment";

import AddEditModal from "../AddEditModal";
import { UserContext } from "../../context/UserContext";

import { Calendar as CalendarInterface, Mood } from "../../types";
import WeeklyGraph from "../WeeklyGraph";
import MonthlyGraph from "../MonthlyGraph";
import YearlyGraph from "../YearlyGraph";

const { Option } = Select;

interface ModalData {
  mood: string;
  date: string;
  notes: string;
  moodText: string;
  moodNumber: number;
}

const Calendar = () => {
  const { user } = useContext(UserContext);
  const [daysOfYear] = useState<number>(
    moment().year() % 400 ? (moment().year() % 100 ? 365 : 366) : 365
  );
  const [calendar, setCalendar] = useState<CalendarInterface[] | null>(null);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [editModalVisibility, setEditModalVisibility] =
    useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  useEffect(() => {
    if (user !== null) generateCalendar(user![moment().year()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getColor = (moodNumber: number): string => {
    if (moodNumber === -1) return "white";
    const colors = [
      "rgb(255, 99, 132)",
      "rgb(255, 159, 64)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(54, 162, 235)",
    ];
    return colors[moodNumber];
  };

  const getEmoji = (
    mood?: number
  ): { emoji: string; moodText: string; mood: number } => {
    if (typeof mood === "undefined") mood = -1;
    switch (mood) {
      case 0:
        return {
          emoji: "🙁",
          moodText: "You said you had a rough day",
          mood: 0,
        };
      case 1:
        return {
          emoji: "😐",
          moodText: "You said you had an okayish day",
          mood: 1,
        };
      case 2:
        return { emoji: "🙂", moodText: "You said it was a good day", mood: 2 };
      case 3:
        return {
          emoji: "😄",
          moodText: "You said you had an awesome day",
          mood: 3,
        };
      case 4:
        return {
          emoji: "🤗",
          moodText: "You said you had a great day!",
          mood: 4,
        };
      default:
        return {
          emoji: "🤔",
          moodText: "You didn't add any data for this day :(",
          mood: -1,
        };
    }
  };

  const generateCalendar = (
    moodInAYear: Record<Mood["date"], Mood> | undefined
  ) => {
    const yearCalendar: CalendarInterface[] = [];
    console.log(moodInAYear);
    if (
      typeof moodInAYear === "undefined" ||
      Object.keys(moodInAYear).length === 0
    ) {
      for (let i = 1; i <= daysOfYear; i++) {
        yearCalendar.push({
          notes: "",
          color: "white",
        });
      }
    } else {
      for (let i = 1; i <= daysOfYear; i++) {
        if (typeof moodInAYear[i] !== "undefined") {
          console.log(moodInAYear[i], i);
          yearCalendar.push({
            notes: moodInAYear[i].notes,
            color: getColor(moodInAYear[i].mood),
          });
        } else {
          yearCalendar.push({
            notes: "",
            color: "white",
          });
        }
      }
    }
    setCalendar(yearCalendar);
  };

  const getModalData = (dayOfYear: number) => {
    const date = moment("31/12/2020", "DD/MM/YYYY")
      .add(dayOfYear, "days")
      .format("DD/MM/YYYY");
    const mood = getEmoji(user![moment().year()][dayOfYear]?.mood);
    if (typeof user![moment().year()][dayOfYear] !== "undefined") {
      setModalData({
        date: date,
        notes: user![moment().year()][dayOfYear].notes,
        mood: mood.emoji,
        moodText: mood.moodText,
        moodNumber: mood.mood,
      });
    } else {
      setModalData({
        date: date,
        mood: mood.emoji,
        notes: "",
        moodText: mood.moodText,
        moodNumber: mood.mood,
      });
    }
    setModalVisibility(true);
  };

  return (
    <>
      <section className="flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl my-4">Stats</h2>
          <Select defaultValue="year">
            <Option value="year">Year</Option>
            <Option value="month">Month</Option>
          </Select>
        </div>
        <div className="flex md:flex-col flex-wrap md:max-h-56 lg:max-h-44 xl:max-h-32">
          {calendar === null
            ? "Loading..."
            : calendar.map((day, i) => (
                <Tooltip
                  title={moment("31/12/2020", "DD/MM/YYYY")
                    .add(i + 1, "days")
                    .format("DD/MM/YYYY")}
                  // title={i}
                  placement="bottom"
                  key={i}
                >
                  <span
                    style={{ backgroundColor: day.color }}
                    className="m-0.5 h-6 w-6 md:h-4 md:w-4"
                    onClick={() => getModalData(i + 1)}
                  ></span>
                </Tooltip>
              ))}
        </div>
        <div className="flex flex-col lg:flex-row mt-8 space-y-5 lg:space-y-0 lg:space-x-5">
          <WeeklyGraph />
          <MonthlyGraph />
        </div>
        <div className="mt-4">
          <YearlyGraph />
        </div>
      </section>
      <AddEditModal
        modalVisibility={editModalVisibility}
        setModalVisibility={setEditModalVisibility}
        isEdit={true}
        editMood={modalData?.moodNumber}
        editNote={modalData?.notes}
      />
      <Modal
        visible={modalVisibility}
        onCancel={() => setModalVisibility(false)}
        title={modalData?.date}
        footer={false}
        centered
        zIndex={10000}
      >
        {modalData === null ? (
          "Loading..."
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-3xl text-center mb-4">{modalData.mood}</p>
            <p className="text-center font-semibold text-lg">
              {modalData.moodText}
            </p>
            {modalData.notes.length > 0 && (
              <div className="flex flex-col items-center">
                <span className="font-normal text-base">because</span>
                <span className="font-semibold text-lg">{modalData.notes}</span>
              </div>
            )}
            <button
              className="px-4 py-2 mt-4 bg-blue-600 hover:bg-blue-500 rounded text-white"
              onClick={() => setEditModalVisibility(true)}
            >
              Edit Details
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Calendar;
