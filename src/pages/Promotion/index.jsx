import GoToBackArrow from "../../components/GoToBackArrow";
import PromotionComponent from "../../components/DifficultComponents/PromotionComponent";
import firstProm from "../../images/promotion_one.png";
import secondProm from "../../images/promotion_two.png";

import "./index.css";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const Promotion = () => {
  const [promotions, setPromotions] = useState()
  
  useEffect(() => {
    fetch("https://beautywebapp.ru/api/offers/sales", {
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
    console.log(
      data
        // .filter(elem => elem?.sales?.length >= 1) // Оставляем только элементы с длиной sales >= 1
        // .map(elem => elem.sales)
        .flat() // Преобразуем отфильтрованные элементы
    );
    
      
      setPromotions(data
        // .filter(elem => elem?.sales?.length >= 1) // Оставляем только элементы с длиной sales >= 1
        // .map(elem => elem.sales)
        .flat());
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
                return <PromotionComponent img={`https://beautywebapp.ru${prom?.image}`} title={prom?.name} description={prom?.short_desc} data={(new Date(prom?.start_date).toISOString().split("T")[0].split("-").reverse().join("."))} dataEnd={(new Date(prom?.end_date).toISOString().split("T")[0].split("-").reverse().join("."))} longDesc={prom?.long_desc}/>
            })
        }
      </div>
    </div>
  );
};

export default Promotion;
