import "./index.css";
import arrow from "../../../images/svg/arrow.svg";
import ServiceComponent from "../../DifficultComponents/ServiceComponent";
import { useState } from "react";

const ServiceList = ({ title, services, setActiveService, chosen }) => {
  const [foldState, setFoldState] = useState({});

  // Функция для переключения состояния fold
  const toggleFold = (category) => {
    setFoldState((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Группировка услуг по категориям
  const groupedServices = services.reduce((acc, service) => {
    const category = service.name || "Без категории";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {});

  return (
    <div className="service_list_component">
      {Object.entries(groupedServices).map(([category, services]) => (
        <div key={category} className="service_category">
          <div className="service_list_title"  style={foldState[category] ? { marginBottom: "35px" } : { marginBottom: "15px" }}>
            <span>{category}</span>
            <button
              className={`fold_bttn ${
                foldState[category] ? "fold_bttn_active" : ""
              }`}
              onClick={() => toggleFold(category)}
            >
              <img src={arrow} alt="arrow" />
            </button>
          </div>
          <div
           style={{ paddingBottom: "15px" }}
            className={`service_list ${
              foldState[category] ? "fold_service_list" : ""
            }`}
          >
            {services.map((serv, ind) => (
              <ServiceComponent
                key={serv.name}
                title={serv.name}
                duraion={serv.duration}
                price={serv.cost}
                serviceId={serv.id}
                setActiveService={setActiveService}
                ind={ind}
                chosenService={chosen}
                category={serv?.category}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
