import "./index.css";
import Rating from "../Rating";
import avatar from "../../images/review_avatar.png";
import expertImg from "../../images/expert_one.png";
import { useEffect, useState } from "react";
const Review2 = ({showExpert, expert}) => {

  const [feedbacks, setFeedbacks] = useState()
  const [rating, setRating] = useState()
  const [info, setInfo] = useState()
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
        console.log('data', data)
        setFeedbacks(data?.feedbacks);
        setInfo(data?.feedbacks);
        setRating(data?.rating)
      }
        // setExperts(data.find(elem => elem.fio == fio))
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
    }
    
  }, [expert])

  console.log("info", info);
  
  
  return (
    <div className="review">
      { info &&
        info.map((elem) => 
        <>
          <div className="reviewer">
            <div className="avatar">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="text_info">
              <div className="reviewer_name">
                <span>{elem?.client?.first_name}</span>
              </div>
              <Rating count={rating ? rating : null} text={new Date(elem?.created_at).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })} />
    
            </div>
          </div>
          <div className="review_text">
            <span>{elem?.message}</span>
          </div>
         {
          showExpert &&  <div className="review_expert">
          <span>{info?.specialist_fio}</span>
          <div className="review_expert_img">
            <img src={info?.specialist_image} alt="expertImg" />
          </div>
        </div>
         }
         </>
        )
        
      }
    </div>
  );
};

export default Review2;
