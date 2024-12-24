import "./index.css";

const TextArea = ({ onChange,placeholder }) => {
  return (
    <textarea
      name="textarea"
      className="textarea"
      placeholder={placeholder || "Напишите отзыв"}
      onChange={onChange}
    ></textarea>
  );
};

export default TextArea;
