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

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Получаем текущую дату в формате YYYY-MM-DD
  
    fetch(`https://beautywebapp.ru/api/order/free_slots/${expert?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Фильтруем только слоты с текущей датой
        const todaySlots = data.filter(slot => slot.date === today);
  
        // Преобразуем данные для отображения
        const formattedTimes = todaySlots.map((slot, index) => ({
          time: slot.start_time.slice(0, 5),
          id: `${slot.start_time.slice(0, 5)}-${index}` // Генерация уникального ключа
        }));
        setTimes(formattedTimes);
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  }, [expert?.id]);
  

  const [activeTimeBttn, setActiveTimeBttn] = useState("");

  const ChooseExpertWithTime = (time) => {
    const today = new Date().toISOString().split('T')[0]; // Получаем сегодняшнюю дату в формате YYYY-MM-DD
    localStorage.setItem('time', time);
    localStorage.setItem('day', today); // Сохраняем текущую дату
    setActiveTimeBttn(time);
  };

  console.log("expert", expert);
  
  
  

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
                  <span>{expert.profession}</span>
                </div>
                <Rating text={expert.rewiews} />
              </div>
            </div>
            <div className="expert_component_bttns">
              <button onClick={() => navigate(`/expert/${expert.fio}`)} className="more_about_expert">
                <img src={i} alt="" />
              </button>
              <CircleButton onClick={onClick} active={active} />
            </div>
          </div>
          <div className="expert_component__bottom_content">
            <div className="registration_day">
              <span>Ближайшая дата по записи:</span>
              <span className="day">{expert.dataRegistr}</span>
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
