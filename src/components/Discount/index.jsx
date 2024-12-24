import "./index.css";
import ArrowRightTop from "../ArrowRightTop";
import discount from "../../images/svg/discount_logo.svg";
const Discount = () => {
  return (
    <div className="discount">
      <div className="discount_logo">
        <img src={discount} alt="discount" />
      </div>
      <div className="discount_text">
        <span>Получить скидку 20%</span>
      </div>
      <ArrowRightTop fill={"#D65AEC"} bg={"white"}/>
    </div>
  );
};

export default Discount;
