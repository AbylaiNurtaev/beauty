import "./index.css";
import expert from "../../images/expert_one.png";
import MorePopup from "../More";
import { useEffect, useState } from "react";
const Attention = () => {
  const [showPopup, setShowPopup] = useState(false);

  const expertId = localStorage.getItem('expertId')
  const[expert, setExpert] = useState()
  const [messages, setMessages] = useState()

  useEffect(() => {
    fetch("https://beautywebapp.ru/api/specialists/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setExpert(data.find(expert => expert.id == expertId))
    })
    fetch("https://beautywebapp.ru/api/specialists/important_message", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setMessages(data)
    })
  }, [])

  const HandlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="attention_component">
      <div className="expert_img">
        <img src={`https://beautywebapp.ru/${expert?.image}`} alt="expert" />
      </div>
      <div className="attention_component_text_content">
        <div className="attention_title">
          <span>Клиент, внимание!</span>
        </div>
        <div className="attention_text">
          {messages?.short_text}
        </div>
        <MorePopup onClick={HandlePopup} message={messages} active={showPopup} />
      </div>
    </div>
  );
};

export default Attention;
