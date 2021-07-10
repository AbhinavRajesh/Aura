import { ChartOptions } from "chart.js";
import { useContext, useEffect, useState } from "react";
import moment from "moment";

import { Line } from "react-chartjs-2";
import { Skeleton } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

import { UserContext } from "../../context/UserContext";

interface Data {
  labels: string[];
  datasets: any;
}

const WeeklyGraph = () => {
  const [data, setData] = useState<Data | null>(null);
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [yLabels] = useState<string[]>(["", "🙁", "😐", "🙂", "😄", "🤗"]);
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
        ticks: {
          callback: function (value, index, values) {
            return window.innerWidth < 500
              ? xLabels[value].slice(0, 5)
              : xLabels[value];
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 5,
        labels: yLabels,
        ticks: {
          stepSize: 1,
          callback: function (value, index, values) {
            return yLabels[value];
          },
        },
      },
    },
  };

  useEffect(() => {
    if (user !== null) getDates(0);
  }, [user]);

  useEffect(() => {
    if (user !== null) getDates(offset);
  }, [offset]);

  const getDates = (weekOffsets: number = 0) => {
    let tempDays = [];
    const tempDates: string[] = [];
    let today = moment().day();
    for (let i = 0; i <= today; i++) {
      const date = moment()
        .add(weekOffsets * 7, "days")
        .subtract(i, "days");
      tempDays.unshift(date.dayOfYear());
      tempDates.unshift(date.format("DD/MM/YYYY"));
    }
    for (let i = today, j = 1; i < 6; i++, j++) {
      const date = moment().add(j + weekOffsets * 7, "days");
      tempDays.push(date.dayOfYear());
      tempDates.push(date.format("DD/MM/YYYY"));
    }
    setXLabels(tempDates);
    getData(tempDays, tempDates);
  };

  const getData = (dates: number[], tempDates: string[]) => {
    const tempData = [];
    for (let i = 0; i < dates.length; i++) {
      if (user![moment().year()][dates[i]]) {
        tempData.push(user![moment().year()][dates[i]].mood + 1);
      } else {
        tempData.push(0);
      }
    }
    setData({
      labels: xLabels.length > 0 ? xLabels : tempDates,
      datasets: [
        {
          data: tempData,
          borderWidth: 1,
          label: "Weekly Stat",
          fill: true,
          tension: 0.4,
          backgroundColor: "rgb(102, 222, 147, 0.5)",
          borderColor: "rgb(102, 222, 147)",
        },
      ],
    });
  };

  return (
    <div className="flex flex-col flex-1 p-2 lg:p-5 bg-white rounded">
      <div className="flex items-center mb-4 justify-between">
        <h3 className="font-bold text-lg">Weekly Mood Graph</h3>
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
            This week
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
        <Line options={options} data={data} type={undefined} />
      ) : (
        <Skeleton active />
      )}
    </div>
  );
};

export default WeeklyGraph;
