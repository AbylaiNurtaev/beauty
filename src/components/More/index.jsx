import ExitBttn from "../Buttons/ExitBttn";
import "./index.css";

const MorePopup = ({ active, onClick1, message }) => {
  return (
    <div className="more_popup_component">
      <span className="more_bttn" onClick={onClick1}>
        Подробнее
      </span>
      {active && (
        <div className="more_popup">
          {/* Кнопка закрытия */}
          <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: '100' }}>
            <ExitBttn onClick={onClick1} /> {/* Корректно передаем функцию */}
          </div>
          {/* Содержимое попапа */}
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
