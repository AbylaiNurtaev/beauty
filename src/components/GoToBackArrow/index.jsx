import { useNavigate } from "react-router-dom";
import arrow from "../../images/svg/arrow.svg";
import "../GoToBackArrow/index.css";

const GoToBackArrow = () => {
  const navigate = useNavigate();

  return (
    <div className="go_to_back_block">
      <div className="go_to_back_arrow" onClick={() => navigate(-1)}>
        <img src={arrow} alt="" />
      </div>
    </div>
  );
};

export default GoToBackArrow;
