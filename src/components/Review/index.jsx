import "./index.css";
import Rating from "../Rating";
import avatar from "../../images/review_avatar.png";
import expertImg from "../../images/expert_one.png";
const Review = ({showExpert, info, expert}) => {

  console.log("expert", expert);
  
  return (
    <div className="review">
      <div className="reviewer">
        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="text_info">
          <div className="reviewer_name">
            <span>{info?.specialist_fio}</span>
          </div>
          <Rating text={new Date(info?.created_at).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })} />

        </div>
      </div>
      <div className="review_text">
        <span>{info?.message}</span>
      </div>
     {
      showExpert &&  <div className="review_expert">
      <span>{info?.client_name}</span>
      <div className="review_expert_img">
        <img src={info?.specialist_image} alt="expertImg" />
      </div>
    </div>
     }
    </div>
  );
};

export default Review;
