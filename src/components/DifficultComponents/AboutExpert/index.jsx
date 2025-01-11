import "./index.css";
import firstExpert from "../../../images/about_expert.png";
import Rating from "../../Rating";
import { useEffect, useState } from "react";

const AboutExpert = ({fio}) => {
  const [feedbacks, setFeedbacks] = useState();
  const [count, setCount] = useState();
  useEffect(() => {
    fetch("https://demo.beautywebapp.ru/api/specialists/", {
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
      console.log("Data received:", data.filter((elem) => elem.fio.toLowerCase() == fio.toLowerCase()));
      setExperts(data.find((elem) => elem.fio.toLowerCase() == fio.toLowerCase()))

      fetch(`https://demo.beautywebapp.ru/api/feedback/${data.find((elem) => elem.fio.toLowerCase() == fio.toLowerCase())?.id}`, {
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
  })
  .catch(error => {
      console.error("Fetch error:", error);
  });
    
  }, [fio])
  const [experts, setExperts] = useState()
  return (
    <div className="about_expert_component">
      <div className="about_expert_component_main_info">
        <div className="expert_img">
          <img src={`https://demo.beautywebapp.ru/${experts?.image}`} alt="expert_img" />
        </div>
        <div className="about_expert__block-text">
          <div className="expert_name">
            <span>{experts?.fio}</span>
          </div>
          <div className="expert_profession">
            <span>{experts?.special.map((elem, index) => index != experts.special.length-1 ? elem.title + ", " : elem.title)}</span>
          </div>
          <Rating count={count} text={feedbacks ? `(${feedbacks})` : ""} />
        </div>
      </div>
      <div className="expert_about_me">
        <div dangerouslySetInnerHTML={{ __html: experts?.description }}></div>
        {/* <p>
          { experts?.description }
        </p> */}
      </div>
    </div>
  );
};

export default AboutExpert;
