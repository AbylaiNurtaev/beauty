import "./index.css";
import i from "../../../images/svg/i.svg";
import avatar from "../../../images/svg/any_expert_logo.svg";
import TimeBttn from "../../Buttons/TimeBttn";
import Rating from "../../Rating";
import CircleButton from "../../Buttons/CircleButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExpertComponent = ({ expert, onClick, active, MoreAbout }) => {
  const [times, setTimes] = useState([]);
  const [feedbacks, setFeedbacks] = useState();
  const [count, setCount] = useState();
  const [nearestDate, setNearestDate] = useState("");

  useEffect(() => {
    fetch(`https://beautywebapp.ru/api/order/free_slots/${expert?.id}`, {
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
        const now = new Date(); // Текущее время

        // Находим ближайшую дату и время
        const nearestSlot = data
          .filter(
            (slot) => new Date(`${slot.date}T${slot.start_time}`) > now // Берем только будущие слоты
          )
          .sort(
            (a, b) =>
              new Date(`${a.date}T${a.start_time}`) -
              new Date(`${b.date}T${b.start_time}`) // Сортируем по времени
          )[0]; // Берем первый (самый ближайший)

        if (!nearestSlot) {
          setTimes([]); // Если нет доступных слотов, задаем пустой массив
          setNearestDate("");
          return;
        }

        // Сохраняем ближайшую дату
        setNearestDate(nearestSlot.date);

        // Фильтруем только слоты с той же датой, что и ближайший
        const nearestDateSlots = data.filter(
          (slot) => slot.date === nearestSlot.date
        );

        // Преобразуем данные для отображения
        const formattedTimes = nearestDateSlots.map((slot, index) => ({
          time: slot.start_time.slice(0, 5),
          id: `${slot.start_time.slice(0, 5)}-${index}`, // Генерация уникального ключа
        }));

        setTimes(formattedTimes);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    fetch(`https://beautywebapp.ru/api/feedback/${expert?.id}`, {
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
        setFeedbacks(data?.feedbacks.length);
        setCount(data?.rating);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [expert?.id]);

  const [activeTimeBttn, setActiveTimeBttn] = useState("");

  const ChooseExpertWithTime = (time) => {
    localStorage.setItem("time", time);
    localStorage.setItem("day", nearestDate); // Сохраняем ближайшую дату
    setActiveTimeBttn(time);
  };

  const navigate = useNavigate();

  return (
    <>
      {expert ? (
        <div className="expert_component">
          <div className="expert_component__top_content">
            <div className="about_expert">
              <div className="expert_img">
                <img src={`https://beautywebapp.ru${expert.image}`} alt="img" />
              </div>
              <div className="about_expert__block-text">
                <div className="expert_name">
                  <span>{expert.fio}</span>
                </div>
                <div className="expert_profession">
                  <span>{expert?.special[0]}</span>
                </div>
                <Rating count={count} text={`(${feedbacks})`} />
              </div>
            </div>
            <div className="expert_component_bttns">
              <button
                onClick={() => navigate(`/expert/${expert.fio}`)}
                className="more_about_expert"
              >
                <img src={i} alt="" />
              </button>
              <CircleButton onClick={onClick} active={active} />
            </div>
          </div>
          <div className="expert_component__bottom_content">
            <div className="registration_day">
              <span style={{ fontWeight: "900" }}>
                Ближайшая дата по записи:{" "}
                {nearestDate
                  ? new Date(nearestDate).toLocaleDateString("ru-RU", {
                      month: "long",
                      day: "numeric",
                      weekday: "short",
                    })
                  : "Нет доступных дат"}
              </span>
            </div>
            <div className="times">
              {times.map(({ time, id }) => {
                return (
                  <TimeBttn
                    key={id}
                    text={time}
                    onClick={() => {
                      ChooseExpertWithTime(time);
                      return onClick();
                    }}
                    active={time === activeTimeBttn && active}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="any_expert">
          <div className="any_expert_avatar">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="any_expert_title">
            <span>Любой специалист</span>
          </div>
          <CircleButton onClick={onClick} active={active} />
        </div>
      )}
    </>
  );
};

export default ExpertComponent;
