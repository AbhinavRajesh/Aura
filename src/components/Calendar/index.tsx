import { useState } from "react";
import { Select, Tooltip } from "antd";
import moment from "moment";

const { Option } = Select;

const Calendar = () => {
  const [daysOfYear] = useState<number>(
    moment().year() % 400 ? (moment().year() % 100 ? 365 : 366) : 365
  );

  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl my-4">Mood</h2>
        <Select defaultValue="year">
          <Option value="year">Year</Option>
          <Option value="month">Month</Option>
        </Select>
      </div>
      <div className="flex flex-wrap">
        {Array.from({ length: daysOfYear }, (_, i) => i).map((day) => (
          <Tooltip
            title={moment("01/01/2021").add(day, "days").format("DD/MM/YYYY")}
            placement="bottom"
            key={day}
            className="border border-gray-50 m-0.5 h-4 w-4 bg-white"
          ></Tooltip>
        ))}
      </div>
    </section>
  );
};

export default Calendar;
