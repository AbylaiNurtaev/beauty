import "./index.css";
import exit from "../../../images/svg/exit_icon.svg";

const ExitBttn = ({ onClick }) => {
  return (
    <div className="exit_flex">
        <button onClick={onClick} className="exit_bttn">
      <img src={exit} alt="exit" />
    </button>
    </div>
  );
};

export default ExitBttn;
