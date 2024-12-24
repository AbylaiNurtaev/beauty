import { useNavigate } from "react-router-dom";
import CreatedText from "../../components/CreatedText";
import NavBlock from "../../components/NavBlock";
import "../NavigationPage/index.css";
const NavigationPage = () => {
  const navigate = useNavigate();
  const navBlockNames = [
    {
      text: "Записаться",
      navigate: "/create-order",
    },
    {
      text: "Услуги",
      navigate: "/choose-service",
    },
    {
      text: "Акции",
      navigate: "/promotion",
    },
    {
      text: "Фото",
      navigate: "/photo",
    },
    {
      text: "FAQ",
      navigate: "/faq",
    },
    {
      text: "Специалисты",
      navigate: "/choose-expert",
    },
    {
      text: "Контакты",
      navigate: "/contacts",
    },
  ];

  return (
    <div className="navigation_page page_bg">
      <div className="nav_panel">
        <NavBlock
          text={navBlockNames[0].text}
          className={"order"}
          onClick={() => navigate(navBlockNames[0].navigate)}
        />
        <div className="nav_page_item">
          {navBlockNames.slice(1, 3).map((el) => {
            if (el.text === "Акции") {
              return (
                <NavBlock
                key={el.text}
                  text={el.text}
                  className={"promotion"}
                  onClick={() => navigate(el.navigate)}
                />
              );
            } else {
              return (
                <NavBlock
                key={el.text}
                  text={el.text}
                  onClick={() => navigate(el.navigate)}
                />
              );
            }
          })}
        </div>
        <div className="nav_page_item">
          {navBlockNames.slice(3, 5).map((el) => {
            return (
              <NavBlock key={el.text} text={el.text} onClick={() => navigate(el.navigate)} />
            );
          })}
        </div>
        <NavBlock
          text={navBlockNames[5].text}
          className={"expert"}
          onClick={() => navigate(navBlockNames[5].navigate)}
        />
        <NavBlock
          text={navBlockNames[6].text}
          className={"contacts"}
          onClick={() => navigate(navBlockNames[6].navigate)}
        />
      </div>
      <CreatedText />
    </div>
  );
};

export default NavigationPage;
