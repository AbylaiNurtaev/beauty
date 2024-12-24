import GoToBackArrow from "../../components/GoToBackArrow";
import PromotionComponent from "../../components/DifficultComponents/PromotionComponent";
import firstProm from "../../images/promotion_one.png";
import secondProm from "../../images/promotion_two.png";

import "./index.css";

const Promotion = () => {
  const promotions = [
    {
      img: firstProm,
      title: `Сияй этой зимой вместе с нами!`,
      description: `При стрижке или окрашивании — восстановление волос в подарок!`,
      data: `01.11.2024 - 05.11.2024`,
    },
    {
      img: secondProm,
      title: `Красота и уход в подарок!`,
      description: `При стрижке или окрашивании — восстановление волос в подарок!`,
      data: `01.11.2024 - 05.11.2024`,
    },
  ];

  return (
    <div className="promotion_page page_bg">
      <GoToBackArrow />
      <div className="promotions_list">
        {
            promotions.map(prom=>{
                return <PromotionComponent img={prom.img} title={prom.title} description={prom.description} data={prom.data}/>
            })
        }
      </div>
    </div>
  );
};

export default Promotion;
