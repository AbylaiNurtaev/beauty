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
  console.log("contac", contacts?.map_url);
  



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
            <div dangerouslySetInnerHTML={{ __html: contacts?.work_time }}></div>
          </div>
          <div className="grafic_days">
            {/* <span>Пн - Сб</span> */}
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden', width: "95%" }}>
  <a
    href="https://yandex.kz/maps/ru/216/zelenograd/?utm_medium=mapframe&utm_source=maps"
    style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}
  >
    Зеленоград
  </a>
  <a
    href="https://yandex.kz/maps/ru/216/zelenograd/house/georgiyevskiy_prospekt_27k2/Z04YdwBgQUUDQFtvfXV3dXtrYg==/?ll=37.170805%2C55.964786&utm_medium=mapframe&utm_source=maps&z=17.17"
    style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}
  >
    Георгиевский проспект, 27к2 — Яндекс Карты
  </a>
  <iframe
    // src={"https://yandex.kz/map-widget/v1/?ll=37.170805%2C55.964786&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgo1NDEyODk1MjU2EmLQoNC-0YHRgdC40Y8sINCc0L7RgdC60LLQsCwg0JfQtdC70LXQvdC-0LPRgNCw0LQsINCT0LXQvtGA0LPQuNC10LLRgdC60LjQuSDQv9GA0L7RgdC_0LXQutGCLCAyN9C6MiIKDeeuFEIV8dtfQg%2C%2C&z=17.17"}
    src={contacts?.map_url}
    height="400"
    // allowFullScreen
    style={{ position: 'relative', width: "100%", border: "none" }}
  ></iframe>
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
