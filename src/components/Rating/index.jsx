import "./index.css";
import star from "../../images/svg/star.svg";

const Rating = ({ count = 0, text }) => {
  // Создаем массив длиной count для использования в map
  const starsArray = Array.from({ length: count });
  console.log(starsArray, 'starsArray');
  
  return (
    <div className="ratings">
      <div className="ratings_stars">
        {starsArray.map((_, index) => (
          <img key={index} src={star} alt="Star" />
        ))}
      </div>
      <span>{text}</span>
    </div>
  );
};

export default Rating;
