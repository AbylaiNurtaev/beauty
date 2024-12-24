import "./index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoToBackArrow from "../../components/GoToBackArrow";
import SearchInput from "../../components/Inputs/SearchInput";
import Discount from "../../components/Discount";
import ServiceList from "../../components/Lists/ServiceList";
import Button from "../../components/Buttons/Button";

const ChooseServicePage = () => {
  const [activeService, setActiveService] = useState("");
  const navigate = useNavigate();
  const [services, setServices] = useState()

  useEffect(() => {
    fetch("https://beautywebapp.ru/api/offers", {
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
      .then((data) => {
        const expertId = localStorage.getItem('expertId')
        if(expertId){
          fetch(`https://beautywebapp.ru/api/offers/specialist/${expertId}/services`, {
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
            .then((data2) => {
              // setServices([data])
              console.log(data);
              const newData = data.filter((elem) => data2.includes(elem.name))
              console.log(newData)

              setServices([newData])
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
        }else{

          setServices([data])

        }
        
        
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

      
      
  }, []);



  const handleSubmit = () => {
    localStorage.setItem('title', activeService.title)
    localStorage.setItem('price', activeService.price)
    localStorage.setItem('duration', activeService.duration)
    localStorage.setItem('serviceId', activeService.serviceId)
    const time = localStorage.getItem('time')
    if(time?.length >= 1){
      navigate("/confirmation")
    }else{

      navigate("/choose-time")
    }
  }
  

  return (
    <div className="choose_service_page page_bg">
      <GoToBackArrow />
      <SearchInput />
      <Discount />
      {services && services.map((serv) => {
        return (
          <ServiceList
            key={serv.name}
            title={serv.name}
            services={serv}
            setActiveService={setActiveService}
            chosen={activeService}
          />
        );
      })}
      {activeService && (
        <div className="choose_service_result">
          <div className="choose_service_result_text">
            <span>{activeService.title}</span>
            <span className="time_res">{activeService.duration}</span>
            <span>{activeService.price} ₽</span>
          </div>
          <Button onClick={() => handleSubmit()}>Продолжить</Button>
        </div>
      )}
    </div>
  );
};

export default ChooseServicePage;
