import "./index.css";
import tick from "../../../images/svg/tick.svg";

const CircleButton = ({ onClick, active }) => {
  return (
    <button
      className={`circle_button ${active ? "circle_button_active" : ""}`}
      onClick={onClick}
    >
      {active && <img src={tick} alt="tick" />}
    </button>
  );
};

export default CircleButton;
