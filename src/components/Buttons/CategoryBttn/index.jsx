import "./index.css";

const CategoryBttn = ({ children, onClick, active }) => {
  return (
    <button
      className={`category_bttn ${active ? "category_bttn_active" : ""}`}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
};

export default CategoryBttn;
