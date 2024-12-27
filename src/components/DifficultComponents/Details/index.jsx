import "./index.css";
import pencilLogo from "../../../images/svg/pencil_icon.svg";
import i from "../../../images/svg/i.svg";
import clock from "../../../images/svg/time_icon.svg";
import tips from "../../../images/svg/rub_icon.svg";
import Rating from "../../Rating";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Details = ({ type, img, onUpdate }) => { // Добавлен пропс onUpdate
  const expertName = localStorage.getItem("expert");
  const [expert, setExpert] = useState();
  const [feedbacks, setFeedbacks] = useState(0); // Для хранения количества отзывов
  const [rating, setRating] = useState(0); // Для хранения рейтинга мастера

  const navigate = useNavigate();
  const time = localStorage.getItem("time");
  const day = localStorage.getItem("day");

  useEffect(() => {
    fetch("https://beautywebapp.ru/api/specialists/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Используется для отправки куков при необходимости
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const foundExpert = data.find((elem) => elem.fio === expertName);
        console.log('foundExpert', foundExpert);
        
        setExpert(foundExpert);

        // Передаём данные о мастере в родительский компонент
        if (onUpdate) {
          onUpdate({ expert: foundExpert });
        }

        // Запрашиваем отзывы для найденного мастера
        if (foundExpert) {
          fetch(`https://beautywebapp.ru/api/feedback/${foundExpert.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  "Network response was not ok " + response.statusText
                );
              }
              return response.json();
            })
            .then((data) => {
              setFeedbacks(data?.feedbacks.length || 0); // Устанавливаем количество отзывов
              setRating(data?.rating || 0); // Устанавливаем рейтинг
            })
            .catch((error) => {
              console.error("Fetch feedback error:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const options = { day: "numeric", month: "long", year: "numeric" };
      return date.toLocaleDateString("ru-RU", options);
    } else {
      return "Выберите время";
    }
  };

  // Обновляем данные времени и даты в родителе
  const handleTimeUpdate = () => {
    if (onUpdate) {
      onUpdate({ time, day: formatDate(day) });
    }
  };

  return (
    <div className="details_component">
      {(type === "expert" || !type) && (
        <>
          <div className="details_component_main_content">
            {expert ? (
              <>
                <div className="details_img">
                  <img src={expert?.image} alt="expert" />
                </div>
                <div className="about_expert__block-text">
                  <div className="expert_name">
                    <span>{expert?.fio}</span>
                  </div>
                  <div className="expert_profession">
                    <span>{expert?.special[0]?.title}</span>
                  </div>
                  <Rating
                    count={rating} // Передаем рейтинг мастера
                    text={feedbacks ? `(${feedbacks} отзывов)` : ""} // Отображаем количество отзывов
                  />
                </div>
              </>
            ) : (
              <p>Вы не выбрали мастера</p>
            )}
          </div>
          {img === "pencil" && (
            <img
              src={pencilLogo}
              onClick={() => navigate("/choose-expert")}
              alt=""
              className="pencilLogo"
            />
          )}
          {img === "i" && (
            <button
              className="more_about_expert"
              onClick={() => navigate("/expert")}
            >
              <img src={i} alt="" />
            </button>
          )}
        </>
      )}
      {type === "time" && (
        <>
          <div className="details_component_main_content">
            <div className="details_img">
              <img src={clock} alt="clock" />
            </div>
            <div className="about_expert__block-text">
              <div className="service_time">
                <span>{time ? time : "Выберите время проведения"}</span>
              </div>
              <div className="service_day">
                <span>{formatDate(day)}</span>
              </div>
            </div>
          </div>
          {img === "pencil" && (
            <img
              src={pencilLogo}
              alt=""
              onClick={() => {
                handleTimeUpdate(); // Обновляем время в родительском компоненте
                navigate("/choose-time");
              }}
              className="pencilLogo"
            />
          )}
        </>
      )}
      {type === "tips" && (
        <>
          <div className="details_component_main_content">
            <div className="details_img">
              <img src={tips} alt="tips" />
            </div>
            <div className="about_expert__block-text">
              <div className="service_time">
                <span>50 ₽</span>
              </div>
              <div className="service_day">
                <span>Будет списано</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
