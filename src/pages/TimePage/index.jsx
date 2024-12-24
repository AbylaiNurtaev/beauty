import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import Calendar from "../../components/Calendar";
import GoToBackArrow from "../../components/GoToBackArrow";
import TimeList from "../../components/Lists/TimeList";
import "./index.css";
import { useState } from "react";

const TimePage = () => {
  const navigate = useNavigate();
  const today = new Date().getDate();
  const [selectedDay, setSelectedDay] = useState(today);
  const [activeDayTime, setActiveDayTime] = useState("");
  const [activeEveningTime, setActiveEveningTime] = useState("");
  const [expert, setExpert] = useState('')

  const handleDaySelection = (day) => {
    setSelectedDay(day);
    setActiveDayTime(""); // Reset active times when day changes
    setActiveEveningTime("");
    localStorage.setItem('day', day)
  };

  const handleDayTimeSelection = (time, expertName) => {
    // console.log("ИМЯ МАСТЕРА И ВРЕМЯ", time, expertName);
    
    setActiveDayTime(time);
    setExpert(expertName);
    setActiveEveningTime(""); // Reset evening time
  };

  const handleEveningTimeSelection = (time) => {
    setActiveEveningTime(time);
    setActiveDayTime(""); // Reset day time
  };

  const handleSubmit = () => {
    const selectedTime = activeDayTime || activeEveningTime;
    if (selectedTime) {
      localStorage.setItem('time', selectedTime);
      localStorage.setItem('expert', expert);
      navigate("/confirmation");
    } else {
      alert("Please select a time");
    }
  };

  

  return (
    <div className="time_page page_bg">
      <GoToBackArrow />
      <Calendar onDaySelect={handleDaySelection} />
      <div className="times">
        <TimeList title={"День"} selectedDay={selectedDay} activeTime={activeDayTime} onTimeSelect={handleDayTimeSelection}/>
        <TimeList title={"Вечер"} selectedDay={selectedDay} activeTime={activeEveningTime} onTimeSelect={handleEveningTimeSelection}/>
      </div>
      <Button onClick={handleSubmit}>Продолжить</Button>
    </div>
  );
};

export default TimePage;
