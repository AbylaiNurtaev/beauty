import "./index.css";
import ArrowRightTop from "../ArrowRightTop";

const NavBlock = ({ text, className, onClick }) => {
  return (
    <div className={`navigaion_block ${className ? className : ""}`}>
      <span>{text}</span>
      <div className="nav_block_part">
        <ArrowRightTop onClick={onClick} />
      </div>
    </div>
  );
};

export default NavBlock;
