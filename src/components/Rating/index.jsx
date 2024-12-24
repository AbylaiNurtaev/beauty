import "./index.css"
import star from "../../images/svg/star.svg";

const Rating =({text}) => {
    return  <div className="ratings">
    <div className="ratings_stars">
      <img src={star} alt="" />
    </div>
    <img src={star} alt="" />
    <img src={star} alt="" />
    <img src={star} alt="" />
    <img src={star} alt="" />
    <span>{text}</span>
  </div>
}

export default Rating;