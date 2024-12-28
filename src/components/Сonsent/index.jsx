import { useEffect, useState } from "react";
import CircleButton from "../Buttons/CircleButton";
import "./index.css";
import ExitBttn from "../Buttons/ExitBttn";

const Consent = ({ handleChangeAgree, agree, error }) => {
  const [discount, setDiscount] = useState()
  useEffect(() => {
    fetch("https://beautywebapp.ru/api/specialists/policies", {
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
    .then(data => {
      
      
      setDiscount(data[0])
    })
  }, [])
  const [popup, setPopup] = useState()
  const HandleAgree = () => {
    handleChangeAgree(!agree);
  };
  
  const BackendDataRenderer = ( data ) => {
    // Обработка данных
    const formattedData = data
      .split(/\r\n|\r|\n/) // Разбиваем строку по любому типу разрыва
      .map((line, index) => (
        <>
          {line}
          <br /> {/* Добавляем разрыв строки */}
        </>
      ));
  
    return <div>{formattedData}</div>;
  };

  return (
    <div className="consent">
      <CircleButton active={agree} onClick={HandleAgree} />
      <div className="consent_text">
        <p style={error ? {color: "red"} : {}}>
          Я даю согласие на обработку моих персональных данных в соответствии с
          <span style={{ color: "blue" }} onClick={() => setPopup(true)}>Политикой конфиденциальности.</span>
        </p>
      </div>
      {
        popup &&
          <div className="more_popup" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", paddingLeft: "40px" }}>
          <ExitBttn onClick={() => setPopup(false)}/>
          <div className={`more_popup_text`}>
            <div className="more_popup_title">
              <span>{discount?.title}</span>
            </div>
            {/* <div dangerouslySetInnerHTML={{__html: discount?.text}}></div> */}
            <p>{BackendDataRenderer(discount?.text)}</p>
          </div>
        </div>
      }
    </div>
  );
};

export default Consent;
