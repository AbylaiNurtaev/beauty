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
              const day = parseInt(date.date.split("-")[2], 10);
              console.log(date.date == selectedDay);
              
              return date.date == selectedDay;
            })
          );
          console.log('formattedSlots', filteredSlots1)

          
          

          if (!filteredSlots1) {
            console.error("No slots found for selected day");
            return; 
          }

          const filteredSlots = filteredSlots1?.slots || [];
          const formattedSlots = Array.from(
            new Set(
              filteredSlots1
                .flatMap((slot) => slot.slots.map((elem) => elem.start_time.slice(0, 5))) // Преобразуем в массив строк времени
            )
          ).filter((time) => {
            const hour = parseInt(time.split(":")[0], 10); // Корректно извлекаем часы
            console.log('hour', hour);
            if (title === "День") {
              return hour < 16;
            } else if (title === "Вечер") {
              return hour >= 16;
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
          <p>No available slots for this day</p>
        )}
      </div>
    </div>
  );
};

export default TimeList;
