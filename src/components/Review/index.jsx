import "./index.css";
import Rating from "../Rating";
import avatar from "../../images/review_avatar.png";
import expertImg from "../../images/expert_one.png";
import { useEffect, useState } from "react";
const Review = ({showExpert, info, expert}) => {

  const [feedbacks, setFeedbacks] = useState()
  useEffect(() => {
    if(expert?.id){
      fetch(`https://beautywebapp.ru/api/feedback/${expert.id}`, {
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
      if(data){
        setFeedbacks(data?.feedbacks);
      }
        // setExperts(data.find(elem => elem.fio == fio))
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
    }
    
  }, [expert])
  
  return (
    <div className="review">
      <div className="reviewer">
        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="text_info">
          <div className="reviewer_name">
            <span>{info?.specialist_fio}</span>
          </div>
          <Rating text={new Date(info?.created_at).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })} />

        </div>
      </div>
      <div className="review_text">
        <span>{info?.message}</span>
      </div>
     {
      showExpert &&  <div className="review_expert">
      <span>{info?.client_name}</span>
      <div className="review_expert_img">
        <img src={info?.specialist_image} alt="expertImg" />
      </div>
    </div>
     }
    </div>
  );
};

export default Review;
