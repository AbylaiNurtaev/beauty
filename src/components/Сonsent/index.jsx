import { useState } from "react";
import CircleButton from "../Buttons/CircleButton";
import "./index.css";

const Consent = () => {
  const [agree, setAgree] = useState(false);

  const HandleAgree = () => {
    setAgree(!agree);
  };

  return (
    <div className="consent">
      <CircleButton active={agree} onClick={HandleAgree} />
      <div className="consent_text">
        <p>
          Я даю согласие на обработку моих персональных данных в соответствии с
          <span>Политикой конфиденциальности.</span>
        </p>
      </div>
    </div>
  );
};

export default Consent;
