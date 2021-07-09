import { UserContext } from "../../context/UserContext";
import { ChartOptions } from "chart.js";
import { useContext, useEffect, useState } from "react";
import moment from "moment";

import { Line } from "react-chartjs-2";

interface Data {
  labels: string[];
  datasets: any;
}

const WeeklyGraph = () => {
  const [data, setData] = useState<Data | null>(null);
  const { user } = useContext(UserContext);

  const options: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          maxTicksLimit: 6,
          callback: function (value, index, values) {
            console.log(values);
            return labels[index];
          },
        },
      },
    },
  };

  const labels = ["", "🙁", "😐", "🙂", "😄", "🤗"];

  useEffect(() => {
    getDates(0);
  }, [user]);

  const getDates = (weekOffsets: number = 0) => {
    let tempDays = [];
    let today = moment().day();
    for (let i = 0; i <= today; i++)
      tempDays.unshift(
        moment()
          .add(weekOffsets * 7, "days")
          .subtract(i, "days")
          .dayOfYear()
      );
    for (let i = today, j = 1; i < 6; i++, j++)
      tempDays.push(
        moment()
          .add(j + weekOffsets * 7, "days")
          .dayOfYear()
      );
    getData(tempDays);
  };

  const getData = (dates: number[]) => {
    const tempData = [];
    for (let i = 0; i < dates.length; i++) {
      if (user![moment().year()][dates[i]]) {
        tempData.push(user![moment().year()][dates[i]].mood + 1);
      } else {
        tempData.push(0);
      }
    }
    setData({
      labels,
      datasets: [
        {
          data: tempData,
          borderWidth: 3,
          label: "Weekly Stat",
          fill: true,
        },
      ],
    });
  };

  return (
    <div>
      {data !== null && <Line options={options} data={data} type={undefined} />}
    </div>
  );
};

export default WeeklyGraph;
