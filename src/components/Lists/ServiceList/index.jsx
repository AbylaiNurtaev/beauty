import "./index.css";
import arrow from "../../../images/svg/arrow.svg";
import ServiceComponent from "../../DifficultComponents/ServiceComponent";
import { useState } from "react";

const ServiceList = ({ title, services, setActiveService, chosen }) => {
  const [foldList, setFoldList] = useState(false);

  

  return (
    <div className="service_list_component">
      <div className="service_list_title">
        <span>{title}</span>
        <button className={`fold_bttn ${foldList ? "fold_bttn_active":""}`} onClick={() => setFoldList(!foldList)}>
          <img src={arrow} alt="arrow" />
        </button>
      </div>
      <div className={`service_list ${foldList ? "fold_service_list":""}`}>
        {services.map((serv, ind) => {
          return (
            <ServiceComponent
              key={serv.name}
              title={serv.name}
              duraion={serv.duration}
              price={serv.cost}
              serviceId={serv.id}
              setActiveService={setActiveService}
              ind={ind}
              chosenService={chosen}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ServiceList;
