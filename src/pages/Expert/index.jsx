import "./index.css";
import GoToBackArrow from "../../components/GoToBackArrow";
import AboutExpert from "../../components/DifficultComponents/AboutExpert";
import Review from "../../components/Review";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Buttons/Button";

const Expert = () => {

  const { fio } = useParams()

  const navigate = useNavigate()

  return (
    <div className="expert_page page_bg">
      <GoToBackArrow />
      <AboutExpert fio={fio}/>
      <Review />
      <Button className={"bottom_bttn"} onClick={()=>navigate(-1)}>Записаться к специалисту</Button>
    </div>
  );
};

export default Expert;
