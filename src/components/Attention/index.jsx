import "./index.css";
import expert from "../../images/expert_one.png";
import MorePopup from "../More";
import { useState } from "react";
const Attention = () => {
  const [showPopup, setShowPopup] = useState(false);

  const HandlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="attention_component">
      <div className="expert_img">
        <img src={expert} alt="expert" />
      </div>
      <div className="attention_component_text_content">
        <div className="attention_title">
          <span>Клиент, внимание!</span>
        </div>
        <div className="attention_text">
          <span>
            С 14 ноября 2024 года салон красоты «Название» принимает оплату
            только картами .
          </span>
          <span>
            Наш салон расположен со стороны входа в супермаркет «Магнит».
          </span>
        </div>
        <MorePopup onClick={HandlePopup} active={showPopup} />
      </div>
    </div>
  );
};

export default Attention;
