import "./index.css";
import arrow from "../../images/svg/arrow.svg";
import { useState, useEffect } from "react";

const Calendar = ({ onDaySelect }) => {
  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const [currentDate, setCurrentDate] = useState(new Date()); // Текущая дата
  const [activeDay, setActiveDay] = useState(""); // Текущий активный день
  const [visibleDays, setVisibleDays] = useState([]); // Дни для отображения

  useEffect(() => {
    // Устанавливаем изначальный список дней (7 дней с текущего)
    setVisibleDays(getWeekDays(currentDate));
    const today = formatDate(currentDate);
    setActiveDay(today);
    onDaySelect(today); // Передаем сегодняшний день в родительский компонент
  }, [currentDate]);

  // Получение списка дней для отображения (7 дней)
  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(startOfWeek);
      nextDay.setDate(startOfWeek.getDate() + i);
      days.push({
        date: nextDay,
        formatted: formatDate(nextDay),
        dayNumber: nextDay.getDate(),
        weekday: weekdays[nextDay.getDay() === 0 ? 6 : nextDay.getDay() - 1], // Переводим день недели в "русский" формат
      });
    }
    return days;
  };

  // Форматирует дату в YYYY-MM-DD
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  };

  // Обработчик выбора дня
  const handleDayClick = (day) => {
    setActiveDay(day.formatted);
    onDaySelect(day.formatted); // Передаем выбранный день родительскому компоненту
  };

  // Переключение недели вперед или назад
  const changeWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar">
      <div className="calendar_header">
        <div className="month">
          <span>{months[currentDate.getMonth()]}</span>
        </div>
        <div className="nav_arrows">
          <img
            src={arrow}
            alt="prev arrow"
            className="prev_month"
            onClick={() => changeWeek(-1)}
          />
          <img
            src={arrow}
            alt="next arrow"
            className="next_month"
            onClick={() => changeWeek(1)}
          />
        </div>
      </div>
      <div className="datas">
        <div className="weekdays">
          {visibleDays.map((day) => (
            <div key={day.formatted} className="weekday">
              <span>{day.weekday}</span>
            </div>
          ))}
        </div>
        <div className="numbers">
          {visibleDays.map((day) => (
            <div
              key={day.formatted}
              className={`day ${activeDay === day.formatted && "active_cal_day"}`}
              onClick={() => handleDayClick(day)}
            >
              <span>{day.dayNumber}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
