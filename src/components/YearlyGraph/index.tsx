import { UserContext } from "../../context/UserContext";
import { ChartOptions } from "chart.js";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

import { Bar } from "react-chartjs-2";
import { Skeleton } from "antd";

interface Data {
  labels: string[];
  datasets: any;
}

const YearlyGraph = () => {
  const [data, setData] = useState<Data | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const { user } = useContext(UserContext);

  const options: ChartOptions = {
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 31,
          precision: 0,
        },
      },
    },
  };

  useEffect(() => {
    if (user !== null) getYears(0);
  }, [user]);

  useEffect(() => {
    if (user !== null) getYears(offset);
  }, [offset]);

  const getYears = (yearOffset: number = 0) => {
    const thisYear = moment().year();
    const offsetYear = thisYear + yearOffset;
    console.log(offsetYear);
    getData(offsetYear);
  };

  const getData = (year: number) => {
    const dataSets: any[] = [];
    const colors: string[] = [
      "rgba(255, 99, 132, 0.4)",
      "rgba(255, 159, 64, 0.4)",
      "rgba(255, 205, 86, 0.4)",
      "rgba(75, 192, 192, 0.4)",
      "rgba(54, 162, 235, 0.4)",
    ];
    const borderColor: string[] = [
      "rgb(255, 99, 132)",
      "rgb(255, 159, 64)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(54, 162, 235)",
    ];
    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const emojis: string[] = ["🙁", "😐", "🙂", "😄", "🤗"];

    for (let i = 0; i < emojis.length; i++) {
      const tempData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let j = 0; j < months.length; j++) {
        const startOfMonth = moment(
          `01/${j < 10 ? "0" + (j + 1) : j + 1}/${year}`,
          "DD/MM/YYYY"
        )
          .startOf("month")
          .dayOfYear();
        const endOfMonth = moment(
          `01/${j < 10 ? "0" + (j + 1) : j + 1}/${year}`,
          "DD/MM/YYYY"
        )
          .endOf("month")
          .dayOfYear();
        if (user![year]) {
          Object.values(user![year]).map((value: any) => {
            if (
              value.date >= startOfMonth &&
              value.date <= endOfMonth &&
              value.mood === i
            ) {
              tempData[j] += 1;
            }
          });
        }
      }
      dataSets.push({
        data: tempData,
        borderWidth: 1,
        label: emojis[i],
        fill: true,
        backgroundColor: colors[i],
        borderColor: borderColor[i],
      });
    }
    setData({
      labels:
        window.innerWidth < 500
          ? months.map((month) => month.slice(0, 1))
          : months,
      datasets: dataSets,
    });
  };

  return (
    <div className="flex flex-col flex-1 py-5 px-5 bg-white rounded">
      <div className="flex items-center mb-4 justify-between">
        <h3 className="font-bold text-lg">Yearly Mood Graph</h3>
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
            This year
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

export default YearlyGraph;
