import "../ChooseExpert/index.css";
import GoToBackArrow from "../../components/GoToBackArrow";
import ExpertList from "../../components/Lists/ExpertList";

const ChooseExpert = () => {

  return (
    <div className="choose_expert_page page_bg">
      <GoToBackArrow />
      <ExpertList />
    </div>
  );
};

export default ChooseExpert;
