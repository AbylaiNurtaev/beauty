import ExitBttn from "../Buttons/ExitBttn";
import "./index.css";
const MorePopup = ({ active, onClick }) => {
  return (
    <div className="more_popup_component">
      <span className="more_bttn" onClick={onClick}>
        Подробнее
      </span>
      {active && (
        <div className="more_popup">
          <ExitBttn onClick={onClick}/>
          <div className="more_popup_text">
            <div className="more_popup_title">
              <span>Оплата только по карте или QR</span>
            </div>
            <p>
              С 14 ноября 2024 года салон красоты «Название» переходит на
              безналичный расчет — теперь мы принимаем оплату только по карте
              или через QR-код. Наличными расчет не производится.
            </p>
            <p>
              Мы ценим ваше время и безопасность, и предлагаем удобный способ
              оплаты, который ускоряет процесс и делает его более безопасным для
              всех наших клиентов.
            </p>
            <p>
              Наш салон находится со стороны входа супермаркета «Магнит», что
              делает нас легко доступными для вас. Приезжайте, воспользуйтесь
              удобной оплатой и получайте первоклассный сервис в нашем салоне!
            </p>
            <p>Будем рады видеть вас!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MorePopup;
