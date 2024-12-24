import "./index.css";
import arrow from "../../images/svg/arrow.svg";
import { useState, useEffect } from "react";

const Calendar = ({ onDaySelect }) => {
  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const [data, setData] = useState([]); // Хранит даты и слоты
  const [days, setDays] = useState([]); // Хранит только дни
  const [activeDay, setActiveDay] = useState(""); // Текущий активный день
  const [slots, setSlots] = useState([]); // Слоты для выбранной даты

  // Получение данных с сервера
  useEffect(() => {
    fetch("https://beautywebapp.ru/api/order/free_slots_by_service/2", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setData(data[0]?.available_dates || []);
        const formattedDays = data[0]?.available_dates.map((item) => item.date);
        setDays(formattedDays);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  // Функция для получения сегодняшнего дня в формате YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const day = today.getDate(); // Получаем число текущего дня
    const month = today.getMonth() + 1; // Получаем месяц (прибавляем 1, так как месяцы начинаются с 0)
    const year = today.getFullYear(); // Получаем год
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`; // Форматируем как YYYY-MM-DD
  };

  // Устанавливаем сегодняшний день как активный при монтировании
  useEffect(() => {
    const today = getTodayDate();
    setActiveDay(today);
    onDaySelect(today); // Передаем сегодняшний день родительскому компоненту
  }, []);

  // Обработчик выбора дня
  const handleDayClick = (day) => {
    setActiveDay(day);
    const selectedDate = data.find((item) => item.date === day);
    setSlots(selectedDate ? selectedDate.slots : []);
    onDaySelect(day); // Вызываем функцию обратного вызова с выбранным днем
  };

  return (
    <div className="calendar">
      <div className="calendar_header">
        <div className="month">
          <span>Ноябрь</span>
        </div>
        <div className="nav_arrows">
          <img src={arrow} alt="arrow" className="prev_month" />
          <img src={arrow} alt="arrow" className="next_month" />
        </div>
      </div>
      <div className="datas">
        <div className="weekdays">
          {weekdays.map((el) => (
            <div key={el} className="weekday">
              <span>{el}</span>
            </div>
          ))}
        </div>
        <div className="numbers">
          {days.map((el) => (
            <div
              key={el}
              className={`day ${activeDay === el && "active_cal_day"}`}
              onClick={() => handleDayClick(el)}
            >
              <span>{el.split("-")[2]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
