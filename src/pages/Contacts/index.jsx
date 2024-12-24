import GoToBackArrow from "../../components/GoToBackArrow";
import "./index.css";
import map from "../../images/map.png";
import Review from "../../components/Review";
import { useEffect, useState } from "react";

const ContactsPage = () => {

  useEffect(() => {
    fetch("https://beautywebapp.ru/api/specialists/contacts", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
      credentials: "include"  // Используется для отправки куков при необходимости
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json(); 
  })
  .then(data => {
      setContacts(data)
  })
  .catch(error => {
      console.error("Fetch error:", error);
  });
    
  }, [])

  const [contacts, setContacts] = useState()



  return (
    <div className="contacts_page page_bg">
      <GoToBackArrow />
      <div className="contacts_page_title">
        <span>Контакты</span>
      </div>
      <div className="contacts_blocks">
        <div className="address">
          <div className="address_title">
            <span>Адрес</span>
          </div>
          <div className="address_text">
            <span>{contacts?.address}</span>
          </div>
        </div>
        <div className="phone">
          <div className="phone_title">
            <span>Телефон</span>
          </div>
          <div className="phone_number">
            <span>{contacts?.phone}</span>
          </div>
        </div>
        <div className="grafic">
          <div className="grafic_title">
            <span>График работы</span>
          </div>
          <div className="grafic_clock">
            <span>{contacts?.work_time}</span>
          </div>
          <div className="grafic_days">
            <span>Пн - Сб</span>
          </div>
        </div>
      </div>
      <div className="map">
        <img src={map} alt="map" />
      </div>
      <div className="contacts_page_title">
        <span>Отзывы</span>
      </div>
      <div className="reviews_list">
        {
          contacts && contacts.feedbacks.map((elem) =>  
            <Review showExpert={true} info={elem}/>
          )
        }
      </div>
    </div>
  );
};

export default ContactsPage;
