import { useEffect, useState } from "react";
import Button from "../../components/Buttons/Button";
import Details from "../../components/DifficultComponents/Details";
import GoToBackArrow from "../../components/GoToBackArrow";
import StarSVG from "../../components/SVG/StarSVG";
import TextArea from "../../components/Inputs/TextArea";
import TipButton from "../../components/Buttons/TipButton";
import expert from "../../images/about_expert.png";
import "./index.css";
import { useNavigate } from "react-router-dom";

const LeaveReview = () => {
  const bttnsText = ["50 ₽", "100 ₽", "Без чаевых", "Своя сумма"];
  const [tipsType, setTipsType] = useState("");
  const [starsCount, setStarsCount] = useState(0);
  const [experts, setExperts] = useState()
  const navigate = useNavigate();

  const name = localStorage.getItem('expert')
  const time = localStorage.getItem('time')
  const day = localStorage.getItem('day')

  const expertId = localStorage.getItem('expertId')

  
  
  

  useEffect(() => {
    const fio = localStorage.getItem('expert')
    fetch("https://beautywebapp.ru/api/specialists/", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
      credentials: "include"  // Используется для отправки куков при необходимости
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json(); 
  })
  .then(data => {
      setExperts(data.find(expert => expert.fio == fio))
  })
  .catch(error => {
      console.error("Fetch error:", error);
  });
    // fetch("https://beautywebapp.ru/api/feedback/feedbacks", {
    //   method: "POST", // Проверьте метод
    //   headers: {
    //       "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //       specialist_id: 3,
    //       client_telegram_id: 0,
    //       vote: 4,
    //       title: "string",
    //       message: "fasdfdsaf"
    //   }),
    //   credentials: "include", // Если нужны куки
    // })
    // .then(response => {
    //   if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   console.log("Success:", data);
    // })
    // .catch(error => {
    //   console.error("Error during booking:", error);
    // });
    
 }, [])


 const formatDate = (dateString) => {
  const months = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const [details, setDetails] = useState();

const handleDetailsUpdate = (newDetails) => {
  setDetails(newDetails.target.value);
};

const sendInfo = async () => {
  const requestBody = {
    "specialist_id": +expertId,
    "client_telegram_id": 0,
    "vote": +starsCount,
    "title": "string",
    "message": details,
    "order_id": 0
  }
  console.log(requestBody);
  
  try {
    const response = await fetch("https://beautywebapp.ru/api/feedback/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Booking successful", data);
      navigate("/order-details");
    } else {
      const errorDetails = await response.json();
      console.error("Booking failed", response.statusText, errorDetails);
    }
  } catch (error) {
    console.error("Error during booking", error);
  }
  navigate("/")
}
 
  return (
    <div className="leave_review_page page_bg">
      <GoToBackArrow />
      <div className="review_component">
        <div className="review_component_service">
          <div className="expert_img">
            <img src={`https://beautywebapp.ru${experts?.image}`} alt="expert_img" />
          </div>
          <div className="review_component_service__block-text">
            <div className="expert_name">
              <span>{name}</span>
            </div>
            <div className="review_component_about_service">
              <span>{formatDate(day)} в {time} </span>
            </div>
          </div>
          <div className="send_review_stars">
            {[1, 2, 3, 4, 5].map((s) => {
              return (
                <StarSVG
                  path={starsCount >= s ? "#f5c926" : "#efefef"}
                  OnClick={() => setStarsCount(s)}
                />
              );
            })}
          </div>
        </div>
        <TextArea placeholder={"Напишите отзыв"} onChange={handleDetailsUpdate}/>
        <div className="give_tips">
          {/* <div className="tips_title">
            <span>Чаевые</span>
          </div> */}
          {/* <div className="tips_bttns_list">
            {bttnsText.map((bttn) => {
              return (
                <TipButton
                  onClick={() => setTipsType(bttn)}
                  active={bttn === tipsType}
                >
                  {bttn}
                </TipButton>
              );
            })}
          </div> */}
        </div>
      </div>
      {(tipsType === bttnsText[0] || tipsType === bttnsText[1]) && (
        <Details type={"tips"} onUpdate={handleDetailsUpdate} />
      )}
      {tipsType === bttnsText[3] && (
        <>
          <div className="tips_input">
            <svg
              width="15"
              height="17"
              viewBox="0 0 15 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 17H5V14H11V12H5V10H9.5C12.257 10 14.5 7.757 14.5 5C14.5 2.243 12.257 0 9.5 0H4C3.73478 0 3.48043 0.105357 3.29289 0.292893C3.10536 0.48043 3 0.734784 3 1V8H0V10H3V12H0V14H3V17ZM5 2H9.5C11.154 2 12.5 3.346 12.5 5C12.5 6.654 11.154 8 9.5 8H5V2Z"
                fill="#C0C0C0"
              />
            </svg>
            <input type="text" placeholder="Введите сумму..." />
          </div>
        </>
      )}
      <Button onClick={() => sendInfo()}>Отправить</Button>
    </div>
  );
};

export default LeaveReview;
