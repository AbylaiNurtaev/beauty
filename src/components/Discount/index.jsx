import "./index.css";
import ArrowRightTop from "../ArrowRightTop";
import discountImg from "../../images/svg/discount_logo.svg";
import { useEffect, useState } from "react";
import ExitBttn from "../Buttons/ExitBttn";
const Discount = () => {
  const [discount, setDiscount] = useState()
  const[popup, setPopup] = useState(false)

  useEffect(() => {
    fetch("https://beautywebapp.ru/api/offers/main_sales", {
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
      setDiscount(data)
    })
  }, [])
  return (
    <>
    <div className="discount" onClick={() => setPopup(true)}>
      <div className="discount_logo">
        <img src={discountImg} alt="discount" />
      </div>
      <div className="discount_text">
        <span>{discount?.title}</span>
      </div>
      <ArrowRightTop fill={"#D65AEC"} bg={"white"}/>
    </div>
      {
        popup &&
          <div className="more_popup" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingLeft: "40px" }}>
          <ExitBttn onClick={() => setPopup(false)}/>
          <div className={`more_popup_text`}>
            <div className="more_popup_title">
              <span>{discount?.title}</span>
            </div>
            <p>
              {discount?.description}
            </p>
          </div>
        </div>
      }
      </>
  );
};

export default Discount;
