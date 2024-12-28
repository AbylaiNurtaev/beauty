import { useState } from "react";
import CircleButton from "../Buttons/CircleButton";
import "./index.css";

const Consent = ({ handleChangeAgree, agree, error }) => {
  const HandleAgree = () => {
    handleChangeAgree(!agree);
  };

  return (
    <div className="consent">
      <CircleButton active={agree} onClick={HandleAgree} />
      <div className="consent_text">
        <p style={error ? {color: "red"} : {}}>
          Я даю согласие на обработку моих персональных данных в соответствии с
          <span>Политикой конфиденциальности.</span>
        </p>
      </div>
    </div>
  );
};

export default Consent;
