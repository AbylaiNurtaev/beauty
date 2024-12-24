import { useState } from "react";
import TimeBttn from "../../TimeBttn";
import "./index.css";

const TimeList = ({ title }) => {
  const times = ["09:00", "10:30", "11:45", "12:00", "13:00", "13:30"];
  const [active, setActive] = useState("");
  return (
    <div className="time_list_component">
      <div className="time_list_title">
        <span>{title || "День"}</span>
      </div>
      <div className="time_bttns_list">
        {times.map((el) => {
          return (
            <TimeBttn
              text={el}
              active={active == el}
              onClick={() => setActive(el)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TimeList;
