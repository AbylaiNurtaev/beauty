import GoToBackArrow from "../../components/GoToBackArrow";
import PromotionComponent from "../../components/DifficultComponents/PromotionComponent";
import firstProm from "../../images/promotion_one.png";
import secondProm from "../../images/promotion_two.png";

import "./index.css";
import { useEffect, useState } from "react";

const Promotion = () => {
  const [promotions, setPromotions] = useState()
  
  useEffect(() => {
    fetch("https://beautywebapp.ru/api/offers/main_sales", {
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
      console.log(data);
      
      setPromotions([data]);
      // setExperts(data.find((elem) => elem.fio.toLowerCase() == fio.toLowerCase()))
  })
  .catch(error => {
      console.error("Fetch error:", error);
  });
  }, [])

  return (
    <div className="promotion_page page_bg">
      <GoToBackArrow />
      <div className="promotions_list">
        { promotions &&
            promotions.map(prom=>{
                return <PromotionComponent img={prom?.img} title={prom?.title} description={prom?.description} data={'dasdas'}/>
            })
        }
      </div>
    </div>
  );
};

export default Promotion;
