import GoToBackArrow from "../../components/GoToBackArrow";
import Question from "../../components/DifficultComponents/Question";
import "./index.css";
import { useEffect, useState } from "react";

const FAQ = () => {

  useEffect(() => {
    fetch("https://demo.beautywebapp.ru/api/faq", {
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
      setQuestions(data)
  })
  .catch(error => {
      console.error("Fetch error:", error);
  });
    
  }, [])

  
  const [questions, setQuestions] = useState(null);

  return (
    <div className="faq_page page_bg">
      <GoToBackArrow />
      <div className="faq_title">
        <span>Часто задаваемые вопросы</span>
      </div>
      <div className="questions_list">
        {questions && questions.map((q, idx)=>{
            return <Question text={q.question} answer={q.answer} idx={idx}/>
        })}
      </div>
    </div>
  );
};

export default FAQ;
