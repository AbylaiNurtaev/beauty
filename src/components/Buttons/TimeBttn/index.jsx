import "../TimeBttn/index.css";

const TimeBttn = ({ text, onClick, active }) => {
  return (
    <button
      className={`time_bttn ${active ? "time_bttn_active" : ""}`}
      onClick={onClick}
    >
      <span>{text || "text"}</span>
    </button>
  );
};

export default TimeBttn;
