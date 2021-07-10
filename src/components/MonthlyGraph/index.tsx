import { UserContext } from "../../context/UserContext";
import { ChartOptions } from "chart.js";
import { useContext, useEffect, useState } from "react";
import moment from "moment";

import { Bar } from "react-chartjs-2";
import { Skeleton } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

interface Data {
  labels: string[];
  datasets: any;
}

const MonthlyGraph = () => {
  const [data, setData] = useState<Data | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const { user } = useContext(UserContext);

  const options: ChartOptions = {
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
    if (user !== null) getMonths(0);
  }, [user]);

  useEffect(() => {
    if (user !== null) getMonths(offset);
  }, [offset]);

  const getMonths = (monthOffset: number = 0) => {
    const today = moment().add(monthOffset, "months");
    const startOfMonth = today.startOf("month").dayOfYear();
    const endOfMonth = today.endOf("month").dayOfYear();

    getData(startOfMonth, endOfMonth);
  };

  const getData = (startOfMonth: number, endOfMonth: number) => {
    const tempData: number[] = [0, 0, 0, 0, 0];
    // eslint-disable-next-line array-callback-return
    Object.values(user![moment().year()]).map((value: any) => {
      if (value.date >= startOfMonth && value.date <= endOfMonth) {
        tempData[value.mood] += 1;
      }
    });
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
      <div className="flex items-center justify-between mb-4 ">
        <h3 className="font-bold text-lg flex ">Monthly Mood Graph</h3>
        <div className="flex items-center">
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
        <Bar options={options} data={data} type={undefined} />
      ) : (
        <Skeleton active />
      )}
    </div>
  );
};

export default MonthlyGraph;
