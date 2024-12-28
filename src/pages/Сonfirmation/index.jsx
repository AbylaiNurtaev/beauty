import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Attention from "../../components/Attention";
import Button from "../../components/Buttons/Button";
import Details from "../../components/DifficultComponents/Details";
import GoToBackArrow from "../../components/GoToBackArrow";
import Input from "../../components/Inputs/Input";
import ServiceComponent from "../../components/DifficultComponents/ServiceComponent";
import Consent from "../../components/Сonsent";
import "./index.css";

const ConfirmaionPage = () => {
  const navigate = useNavigate();

  const duration = localStorage.getItem('duration');
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [agree, setAgree] = useState(false);

  const[error, setError] = useState(false)
  

  const handleSubmit = async () => {
    if(!agree){
      setError(true)
      return
    }
    setError(false)
    const time = localStorage.getItem('time')
    const day = localStorage.getItem('day')
    const expertId = localStorage.getItem('expertId')
    const serviceId = localStorage.getItem('expertId')

    const requestBody = {
      "specialist_id": +expertId,
      "service_id": +serviceId,
      "client_telegram_id": 91124946,
      "booking_date": day,
      "booking_start_time": time,
      "client_name": name,
      "client_phone": phone,
      "comment": comment
    }
  
    console.log("Request Body:", JSON.stringify(requestBody, null, 2));
  
    try {
      const response = await fetch("https://beautywebapp.ru/api/order/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Booking successful", data);
        navigate("/order-details");
      } else {
        const errorDetails = await response.json();
        console.error("Booking failed", response.statusText, errorDetails);
        alert('Запись на это время уже недоступна')
      }
    } catch (error) {
      console.error("Error during booking", error);
    }
  };
  
  return (
    <div className="confirmation_page page_bg">
      <GoToBackArrow />
      <div className="content_title">
        <span>Детали записи</span>
      </div>
      <div className="details_list">
       <Details type={"expert"} img={"pencil"}/>
       <Details type={"time"} img={"pencil"}/>
       </div>
      <div className="content_title">
        <span>
          Услуги <span>· {duration ? duration : ""}</span>
        </span>
      </div>
      <div className="content_title">
        <span>Ваши данные</span>
      </div>
      <form className="form">
        <Input placeholder={"Имя"} value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder={"Номер телефона"} value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Input placeholder={"Комментарий к записи"} value={comment} onChange={(e) => setComment(e.target.value)} />
      </form>
      <Consent handleChangeAgree={(value) => setAgree(value)} agree={agree} error={error}/>
      <Attention />
      <Button onClick={handleSubmit}>Записаться</Button>
    </div>
  );
};

export default ConfirmaionPage;
