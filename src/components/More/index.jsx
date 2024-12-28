import ExitBttn from "../Buttons/ExitBttn";
import "./index.css";
const MorePopup = ({ active, onClick, message }) => {
  return (
    <div className="more_popup_component">
      <span className="more_bttn" onClick={onClick}>
        Подробнее
      </span>
      {active && (
        <div className="more_popup">
          <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <ExitBttn onClick={onClick}/>
          </div>
          <div className="more_popup_text">
            <div className="more_popup_title">
              <span>{message?.title}</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: message?.long_text }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MorePopup;
