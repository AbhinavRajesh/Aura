import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import moment from "moment";

import { Bar } from "react-chartjs-2";
import { Skeleton } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { db } from "../../utils/firebase";
import { User } from "../../types";

interface Data {
  labels: string[];
  datasets: any;
}

const MonthlyGraph = () => {
  const [data, setData] = useState<Data | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [month, setMonth] = useState<string>(moment().format("MMMM"));
  const { user, setUser } = useContext(UserContext);

  const options: any = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 31,
          precision: 0,
        },
      },
    },
  };

  useEffect(() => {
    if (user !== null) getMonths(offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, offset]);

  const getMonths = (monthOffset: number = 0) => {
    const today = moment().add(monthOffset, "months");
    setMonth(today.format("MMMM"));
    const startOfMonth = today.startOf("month").dayOfYear();
    const endOfMonth = today.endOf("month").dayOfYear();
    const year = today.year();

    getData(startOfMonth, endOfMonth, year);
  };

  const getData = async (
    startOfMonth: number,
    endOfMonth: number,
    year: number
  ) => {
    const tempData: number[] = [0, 0, 0, 0, 0];
    if (user![year]) {
      // eslint-disable-next-line array-callback-return
      Object.values(user![year]).map((value: any) => {
        if (value.date >= startOfMonth && value.date <= endOfMonth) {
          tempData[value.mood] += 1;
        }
      });
    } else {
      await db
        .collection("users")
        .doc(user?.email)
        .update({ ...user, [year]: {} });
      setUser!({ ...user, [year]: {} } as User);
    }
    setData({
      labels: ["🙁", "😐", "🙂", "😄", "🤗"],
      datasets: [
        {
          data: tempData,
          borderWidth: 1,
          label: "Weekly Stat",
          fill: true,
          backgroundColor: [
            "rgba(255, 99, 132, 0.4)",
            "rgba(255, 159, 64, 0.4)",
            "rgba(255, 205, 86, 0.4)",
            "rgba(75, 192, 192, 0.4)",
            "rgba(54, 162, 235, 0.4)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
    });
  };

  return (
    <div className="flex flex-col flex-1 py-5 px-5 bg-white rounded">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 ">
        <h3 className="font-bold text-lg flex ">
          Monthly Mood: &nbsp;
          <span className="text-blue-600 hover:text-blue-500">{month}</span>
        </h3>
        <div className="flex items-center mt-3 md:mt-0">
          <div
            className="font-bold shadow hover:shadow-md cursor-pointer transform duration-150 h-8 w-8 flex items-center justify-center rounded-full"
            onClick={() => setOffset((prev) => prev - 1)}
          >
            <CaretLeftOutlined />
          </div>
          <div
            className="px-2 py-1 shadow rounded mx-1 cursor-pointer font-semibold"
            onClick={() => setOffset(0)}
          >
            This month
          </div>
          <div
            className="font-bold shadow hover:shadow-md cursor-pointer transform duration-150 h-8 w-8 flex items-center justify-center rounded-full"
            onClick={() => setOffset((prev) => prev + 1)}
          >
            <CaretRightOutlined />
          </div>
        </div>
      </div>
      {data !== null ? (
        <Bar options={options} data={data} />
      ) : (
        <Skeleton active />
      )}
    </div>
  );
};

export default MonthlyGraph;
