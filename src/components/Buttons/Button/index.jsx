import "./index.css";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      className={`big_bttn ${className ? className : ""}`}
      onClick={onClick}
    >
      <span>{children || "text"}</span>
    </button>
  );
};

export default Button;
