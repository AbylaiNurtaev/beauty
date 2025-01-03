import "./index.css";
import firstExpert from "../../../images/expert_one.png";
import secondExpert from "../../../images/expert_two.png";
import ExpertComponent from "../../DifficultComponents/ExpertComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Buttons/Button";

const ExpertList = () => {
  const navigate = useNavigate();
  const [expertId, setExpertId] = useState()
  useEffect(() => {
    fetch("https://beautywebapp.ru/api/specialists/", {
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
      console.log("Data received:", data);
      setExperts(data)
  })
  .catch(error => {
      console.error("Fetch error:", error);
  });
    
  }, [])

  const handleSubmit = () => {
    localStorage.setItem('expert', choosenExpert)
    localStorage.setItem('expertId', expertId)
    const service = localStorage.getItem('serviceId')
    const time = localStorage.getItem('time')
    if(service && time){
      navigate("/confirmation")
    }else if(!service){
      navigate("/choose-service")
    }else if(!time){
      navigate("/choose-time")
    }
  }
  
  
  
  const [experts, setExperts] = useState()
  const [choosenExpert, setChoosenExpert] = useState("");
  
  console.log(expertId);

  return (
    <div className="expert_list">
      <ExpertComponent
        active={choosenExpert === ""}
        onClick={() => setChoosenExpert("")}
      />
      {experts && experts.map((expert) => {
        return (
          <ExpertComponent
            key={expert.fio}
            expert={expert}
            active={choosenExpert === expert.fio}
            onClick={() => {setChoosenExpert(expert.fio); setExpertId(expert.id)}}
          />
        );
      })}
      {
        choosenExpert && <div style={{ position: "fixed", bottom: "20px", width: "90%" }}>
        <Button onClick={() => handleSubmit()}>Записаться</Button>
        </div>
      }
    </div>
  );
};

export default ExpertList;
