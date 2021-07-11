import { Skeleton } from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Calendar, User } from "../../types";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebase";

interface Props {
  calendar: Calendar[];
  getModalData: (dayOfYear: number, year: number) => void;
  getColor: (moodNumber: number) => string;
}

const MonthlyPixles = ({ calendar, getModalData, getColor }: Props) => {
  const { user, setUser } = useContext(UserContext);
  const [month, setMonth] = useState<string>(moment().format("MMMM"));
  const [maxAndMinDates, setMaxAndMinDates] = useState<{
    max: number;
    min: number;
  }>({
    max: moment().endOf("month").dayOfYear(),
    min: moment().startOf("month").dayOfYear(),
  });
  const [offset, setOffset] = useState<number>(0);
  const [monthlyCalendar, setMonthlyCalendar] = useState<Calendar[]>([]);
  const [weekdays] = useState<string[]>([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ]);
  const [year, setYear] = useState<number>(moment().year());

  useEffect(() => {
    getCalendar(offset);
  }, [calendar, offset]);

  const getCalendar = async (monthOffset: number) => {
    const month = moment().add(monthOffset, "months");
    const min = month.startOf("month").dayOfYear();
    const max = month.endOf("month").dayOfYear();
    setMonth(month.format("MMMM"));
    setMaxAndMinDates({
      min,
      max,
    });
    const year = month.year();
    setYear(year);
    const newCalendar: Calendar[] = [];
    if (typeof user![year] === "undefined") {
      await db
        .collection("users")
        .doc(user?.email)
        .update({ ...user, [year]: {} });
      setUser!({ ...user, [year]: {} } as User);
      const daysOfYear =
        moment().year() % 400 ? (moment().year() % 100 ? 365 : 366) : 365;
      for (let i = 1; i <= daysOfYear; i++) {
        newCalendar.push({
          notes: "",
          color: "rgb(249, 250, 251)",
        });
      }
    } else if (year !== moment().year()) {
      const daysOfYear =
        moment().year() % 400 ? (moment().year() % 100 ? 365 : 366) : 365;
      for (let i = 1; i <= daysOfYear; i++) {
        if (typeof user![year][i] !== "undefined") {
          newCalendar.push({
            notes: user![year][i].notes,
            color: getColor(user![year][i].mood),
          });
        } else {
          newCalendar.push({
            notes: "",
            color: "rgb(249, 250, 251)",
          });
        }
      }
    }
    const tempCalendar =
      newCalendar.length === 0
        ? calendar.slice(min - 1, max)
        : newCalendar.slice(min - 1, max);
    setMonthlyCalendar(tempCalendar);
  };

  const getDayOffset = (offset: number) => {
    switch (offset) {
      case 1:
        return "col-start-1 col-end-2";
      case 2:
        return "col-start-1 col-end-3";
      case 3:
        return "col-start-1 col-end-4";
      case 4:
        return "col-start-1 col-end-5";
      case 5:
        return "col-start-1 col-end-6";
      case 6:
        return "col-start-1 col-end-7";
      case 7:
      default:
        return "hidden";
    }
  };

  return (
    <div className="flex flex-1 md:items-start flex-col md:flex-row-reverse p-4 md:p-6 bg-white rounded">
      <div className="flex-1 flex items-center justify-between mb-4 border-b pb-3 md:mx-8 md:flex-col md:border-none md:items-start">
        <h3 className="font-bold text-3xl md:text-5xl md:mb-4 text-blue-600 hover:text-blue-500">
          {month}
        </h3>
        <div className="flex flex-col items-start">
          <div className="flex items-center">
            <div
              className="font-bold shadow hover:shadow-md cursor-pointer transform duration-150 h-8 w-8 flex items-center justify-center rounded-full"
              onClick={() => setOffset((prev) => prev - 1)}
            >
              <CaretLeftOutlined />
            </div>
            <div
              className="px-2 py-1 shadow rounded mx-1 cursor-pointer font-semibold md:text-lg"
              onClick={() => setOffset(0)}
            >
              {moment().format("MMMM")}
            </div>
            <div
              className="font-bold shadow hover:shadow-md cursor-pointer transform duration-150 h-8 w-8 flex items-center justify-center rounded-full"
              onClick={() => setOffset((prev) => prev + 1)}
            >
              <CaretRightOutlined />
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-gray-400 italic font-medium mt-4">
              (You can view/edit your mood for a particular day by clicking on
              the tile)
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-x-1 gap-y-1">
        {weekdays.map((weekday, i) => (
          <span key={i} className="flex items-center justify-center">
            {weekday}
          </span>
        ))}
        <span
          // Hopefully works when purging
          className={getDayOffset(
            moment().dayOfYear(maxAndMinDates.min).isoWeekday()
          )}
        ></span>
        {monthlyCalendar.length > 0 ? (
          monthlyCalendar.map((day, i) => (
            <span
              style={{ backgroundColor: day.color, aspectRatio: "1/1" }}
              className="tracking-tighter pr-1 md:pr-3 h-full w-full md:h-12 md:w-12 flex items-end justify-end font-bold"
              onClick={() => getModalData(maxAndMinDates.min + i, year)}
              key={i}
            >
              {i + 1}
            </span>
          ))
        ) : (
          <Skeleton active />
        )}
      </div>
    </div>
  );
};

export default MonthlyPixles;
