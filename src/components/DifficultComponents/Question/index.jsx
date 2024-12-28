import { useEffect, useState } from "react";
import "./index.css";

const Question = ({ text, answer, idx }) => {
  useEffect(() => {
    if(idx == 0) {
      setShowAnswer(true)
    } 
  }, [])
  const [showAnswer, setShowAnswer] = useState(false);
  
  

  return (
    <div className={`question_component ${showAnswer?"active_answer":""}`}>
      <div className="question_component_header">
        <div className="question">
          <p>{text}</p>
        </div>
        <svg
          width="11"
          height="18"
          viewBox="0 0 11 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <path
            d="M8.75 2L2 8.75L8.75 15.5"
            stroke="#3375F6"
            strokeWidth="2.25"
            strokeMiterlimit="10"
            strokeLinecap="square"
          />
        </svg>
      </div>
      <div className="question_component_answer">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default Question;
