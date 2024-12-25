import "./index.css";
import GoToBackArrow from "../../components/GoToBackArrow";
import AboutExpert from "../../components/DifficultComponents/AboutExpert";
import Review from "../../components/Review";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import { useEffect, useState } from "react";

const Expert = () => {

  const { fio } = useParams()
  const [expert, setExperts] = useState()

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
      setExperts(data.find(elem => elem.fio == fio))
  })
  .catch(error => {
      console.error("Fetch error:", error);
  });
    
  }, [])
  const navigate = useNavigate()

  return (
    <div className="expert_page page_bg">
      {
        expert && <>
        <GoToBackArrow />
        <AboutExpert fio={fio}/>
        <Review expert={expert}/>
        <Button className={"bottom_bttn"} onClick={()=>navigate(-1)}>Записаться к специалисту</Button>
        </>
      }
    </div>
  );
};

export default Expert;
