import "./index.css";

const TipButton = ({ children, onClick,active }) => {
  return (
    <button className={`tips_bttn ${active?"tips_bttn_active":""}`} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};

export default TipButton;
