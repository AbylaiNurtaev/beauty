import "../OrderComponentList/index.css";
import expertIcon from "../../../images/svg/expert_icon.svg";
import serviceIcon from "../../../images/svg/service_icon.svg";
import timeIcon from "../../../images/svg/time_icon.svg";
import ChooseComponent from "../../DifficultComponents/ChooseComponent";
import { useNavigate } from "react-router-dom";

const OrderComponentList = () => {
  const navigate = useNavigate();
  const chooseList = [
    {
      text: "Выбрать специалиста",
      img: expertIcon,
      navigate: "/choose-expert",
    },
    { text: "Выбрать услугу", img: serviceIcon, navigate: "/choose-service" },
    // { text: "Выбрать дату и время", img: timeIcon, navigate: "/choose-time" },
  ];

  return (
    <div className="order_list">
      {chooseList.map(el=>{
        return <ChooseComponent
        text={el.text}
        img={el.img}
        onClick={() => navigate(el.navigate)}
      />
      })}
    </div>
  );
};

export default OrderComponentList;
