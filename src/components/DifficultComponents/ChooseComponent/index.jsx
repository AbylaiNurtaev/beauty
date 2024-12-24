import ArrowRightTop from "../../ArrowRightTop";
import "./index.css";

const ChooseComponent = ({text,img,onClick}) => {


  return (
    <div className="choose_component">
      <div className="choose_commponent_top">
        <div className="choose_commponent_icon">
          <img src={img||""} alt="icon" />
        </div>
      </div>
      <div className="choose_commponent_bottom">
        <div className="choose_commponent_title">
            <span>{text}</span>
        </div>
        <ArrowRightTop bg={"blue"} onClick={onClick}/>
      </div>
    </div>
  );
};

export default ChooseComponent;
