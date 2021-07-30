import { useContext, useState, useEffect } from "react";
import { Select, Modal, Skeleton } from "antd";
import moment from "moment";

import AddEditModal from "../AddEditModal";
import { UserContext } from "../../context/UserContext";

import { Calendar as CalendarInterface, Mood, User } from "../../types";
import WeeklyGraph from "../WeeklyGraph";
import MonthlyGraph from "../MonthlyGraph";
import YearlyGraph from "../YearlyGraph";
import YearlyPixels from "../YearlyPixels";
import MonthlyPixles from "../MonthlyPixels";
import { db } from "../../utils/firebase";
import { getEmoji } from "../../utils/helper";

const { Option } = Select;

interface ModalData {
  mood: string;
  date: string;
  notes: string;
  moodText: string;
  moodNumber: number;
}

const Calendar = () => {
  const { user, setUser } = useContext(UserContext);
  const [daysOfYear] = useState<number>(
    moment().year() % 400 ? (moment().year() % 100 ? 365 : 366) : 365
  );
  const [calendar, setCalendar] = useState<CalendarInterface[] | null>(null);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [editModalVisibility, setEditModalVisibility] =
    useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [yearlyOrMonthly, setYearlyOrMonthly] = useState<string>("year");

  useEffect(() => {
    if (user !== null) generateCalendar(user![moment().year()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, yearlyOrMonthly]);

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

  const generateCalendar = (
    moodInAYear: Record<Mood["date"], Mood> | undefined
  ) => {
    const yearCalendar: CalendarInterface[] = [];
    if (
      typeof moodInAYear === "undefined" ||
      Object.keys(moodInAYear).length === 0
    ) {
      for (let i = 1; i <= daysOfYear; i++) {
        yearCalendar.push({
          notes: "",
          color: yearlyOrMonthly === "year" ? "white" : "rgb(249, 250, 251)",
        });
      }
    } else {
      for (let i = 1; i <= daysOfYear; i++) {
        if (typeof moodInAYear[i] !== "undefined") {
          yearCalendar.push({
            notes: moodInAYear[i].notes,
            color: getColor(moodInAYear[i].mood),
          });
        } else {
          yearCalendar.push({
            notes: "",
            color: yearlyOrMonthly === "year" ? "white" : "rgb(249, 250, 251)",
          });
        }
      }
    }
    setCalendar(yearCalendar);
  };

  const getModalData = async (
    dayOfYear: number,
    year: number = moment().year()
  ) => {
    const date = moment(`31/12/${year - 1}`, "DD/MM/YYYY")
      .add(dayOfYear, "days")
      .format("DD/MM/YYYY");
    if (typeof user![year] === "undefined") {
      await db
        .collection("users")
        .doc(user?.email)
        .update({ ...user, [year]: {} });
      setUser!({ ...user, [year]: {} } as User);
    }
    const mood = getEmoji(user![year][dayOfYear]?.mood);
    if (typeof user![year][dayOfYear] !== "undefined") {
      setModalData({
        date: date,
        notes: user![year][dayOfYear].notes,
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
        <div className="flex justify-between items-center mt-2">
          <h2 className="font-bold text-2xl my-4">Stats</h2>
          <Select
            defaultValue="year"
            size="large"
            onChange={(val) => setYearlyOrMonthly(val)}
          >
            <Option value="year">Year</Option>
            <Option value="month">Month</Option>
          </Select>
        </div>
        <div
          className={`flex md:flex-col flex-wrap ${
            calendar === null && "mb-6"
          } ${
            yearlyOrMonthly === "year" && "md:max-h-56 lg:max-h-44 xl:max-h-32"
          }`}
        >
          {calendar === null ? (
            <Skeleton active className="bg-white p-4 rounded" />
          ) : yearlyOrMonthly === "year" ? (
            <YearlyPixels calendar={calendar} getModalData={getModalData} />
          ) : (
            <MonthlyPixles
              calendar={calendar}
              getModalData={getModalData}
              getColor={getColor}
            />
          )}
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
        editDate={modalData?.date}
      />
      <Modal
        visible={modalVisibility}
        onCancel={() => setModalVisibility(false)}
        title={modalData?.date}
        footer={false}
        centered
      >
        {modalData === null ? (
          "Loading..."
        ) : (
          <div className="flex flex-col items-center overflow-hidden">
            <p className="text-3xl text-center mb-4">{modalData.mood}</p>
            <p className="text-center font-semibold text-lg">
              {modalData.moodText}
            </p>
            {modalData.notes.length > 0 && (
              <div className="flex flex-col items-center">
                <span className="font-normal text-base">because</span>
                <span className="font-semibold text-lg text-center ">
                  {modalData.notes}
                </span>
              </div>
            )}
            <button
              className="px-4 py-2 mt-4 bg-blue-600 hover:bg-blue-500 rounded text-white"
              onClick={() => {
                setEditModalVisibility(true);
                setModalVisibility(false);
              }}
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
