import CreatedText from "../../components/CreatedText";
import GoToBackArrow from "../../components/GoToBackArrow";
import OrderComponentList from "../../components/Lists/OrderComponentList";
import "./index.css";

const CreateOrderPage = () => {
  return (
    <div className="order_page page_bg">
      <GoToBackArrow />
      <OrderComponentList />
      <CreatedText />
    </div>
  );
};

export default CreateOrderPage;
