import "./index.css";

const Input = ({ placeholder, value, onChange }) => {
  return <input type="text" placeholder={placeholder} value={value} onChange={onChange} className="ui_input" />;
};

export default Input;

