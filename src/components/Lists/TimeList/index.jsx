import { useState, useEffect } from "react";
import TimeBttn from "../../Buttons/TimeBttn";
import "./index.css";
import { useNavigate } from "react-router-dom";

const TimeList = ({ title, selectedDay, activeTime, onTimeSelect }) => {
  const [slots, setSlots] = useState([]);
  const [expertName, setExpertName] = useState(""); // Добавили имя мастера
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const serviceId = localStorage.getItem('serviceId');

    if (serviceId) {
      fetch(`https://beautywebapp.ru/api/order/free_slots_by_service/${serviceId}`, {
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
          if (!data[0]?.available_dates) {
            console.error("No available dates in the data");
            return;
          }

          // Получаем имя мастера из данных
          setExpertName(data[0]?.fio || "Неизвестный мастер");

          // Фильтруем слоты по выбранному дню
          const filteredSlots1 = data.flatMap((item) =>
            item.available_dates.filter((date) => {
              
              return date.date === selectedDay; // Фильтруем по выбранному дню
            })
          );
          
          if (!filteredSlots1 || filteredSlots1.length === 0) {
            console.error("No slots found for selected day");
            return;
          }
          
          const filteredSlots = filteredSlots1.flatMap((item) => item.slots); // Извлекаем все слоты
          const formattedSlots = Array.from(
            new Set(
              filteredSlots.map((slot) => slot.start_time.slice(0, 5)) // Берем только HH:mm
            )
          )
            .sort((a, b) => {
              // Сортируем по времени
              const [hoursA, minutesA] = a.split(":").map(Number);
              const [hoursB, minutesB] = b.split(":").map(Number);
              return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
            })
            .filter((time) => {
              const hour = parseInt(time.split(":")[0], 10); // Фильтруем по часам
              if (title === "День") {
                return hour < 16; // Утро до 16:00
              } else if (title === "Вечер") {
                return hour >= 16; // Вечер с 16:00
              }
              return true;
          });
          
        

            
            setSlots(formattedSlots);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
        } else {
          alert("Выберите услугу");
          navigate("/choose-service");
        }
      }, [title, selectedDay]);

  return (
    <div className="time_list_component">
      <div className="time_list_title">
        <span>{title || "День"}</span>
      </div>
      <div className="time_bttns_list">
        {slots && slots.length > 0 ? (
          slots.map((time) => (
            <TimeBttn
              key={time}
              text={time}
              active={activeTime === time}
              // Передаём время и имя мастера в родителя
              onClick={() => onTimeSelect(time, expertName)}
            />
          ))
        ) : (
          <p>Нет актуальных слотов для записи</p>
        )}
      </div>
    </div>
  );
};

export default TimeList;
