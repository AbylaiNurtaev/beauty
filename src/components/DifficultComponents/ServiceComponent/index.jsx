import "./index.css";
import pencilLogo from "../../../images/svg/pencil_icon.svg";
import CircleButton from "../../Buttons/CircleButton";
import { useNavigate } from "react-router-dom";

const ServiceComponent = ({
  title,
  duraion,
  price,
  ind,
  setActiveService,
  chosenService,
  img,
  serviceId,
  category,
  description
}) => {
  const active = chosenService?.title == title;
  
  const navigate = useNavigate()
  

  const ChooseService = () => {
    if (active) {
      setActiveService("");
    } else {      
      setActiveService({title, duration: duraion, price, serviceId, category});
    }
  };

  return (
    <div className="service_component">
      <div className="about_service">
        <div className="service_title">
          <span>{title}</span>
        </div>
        <div className="service_duration">
          <span>{duraion} {description ? description : ""}</span>
        </div>
        <div className="service_price">
          <span>{price} ₽</span>
        </div>
      </div>
      {setActiveService && (
        <CircleButton onClick={ChooseService} active={active} />
      )}
      {(!setActiveService && img==="pencil") && <img src={pencilLogo} onClick={() => navigate('/choose-service')} alt="pencilLogo" />}
    </div>
  );
};

export default ServiceComponent;
