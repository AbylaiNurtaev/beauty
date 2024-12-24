import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import Details from "../../components/DifficultComponents/Details";
import GoToBackArrow from "../../components/GoToBackArrow";
import ServiceComponent from "../../components/DifficultComponents/ServiceComponent";
import "./index.css";

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const title = localStorage.getItem('title')
  const duration = localStorage.getItem('duration')
  const price = localStorage.getItem('price')

  

  return (
    <div className="order_details_page page_bg">
      <GoToBackArrow />
      <div className="you_signed_up">
        <div className="you_signed_up_logo">
          <svg
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.75 10.0208L0 5.27083L1.1875 4.08333L4.75 7.64583L12.3958 0L13.5833 1.1875L4.75 10.0208Z"
              fill="#d65aec"
            />
          </svg>
        </div>
        <div className="you_signed_up_text">
          <span>Вы записались!</span>
        </div>
      </div>
      <div className="content_title">
        <span>Детали записи</span>
      </div>
      <div className="order_details_list">
        <Details type={"expert"} img={"i"} />
        <Details type={"time"} />

        <ServiceComponent
          title={title}
          duraion={duration}
          price={price}
          chosenService={{title}}
        />
      </div>
      {/* Перенаправление на /leave-review сделано лишь для демонстрации,чтобы заказчик смог перейти на нее и рассмотреть верстку */}
      <Button onClick={() => navigate("/leave-review")}>Назад в меню</Button>
    </div>
  );
};

export default OrderDetailsPage;
