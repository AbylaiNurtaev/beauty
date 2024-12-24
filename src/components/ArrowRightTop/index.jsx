import "../ArrowRightTop/index.css";

const ArrowRightTop = ({ fill, bg,onClick }) => {
  return (
    <div className={`arrow_to_right_top ${bg ? bg : ""}`} onClick={onClick}>
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.96967 9.46967C0.676777 9.76256 0.676777 10.2374 0.96967 10.5303C1.26256 10.8232 1.73744 10.8232 2.03033 10.5303L0.96967 9.46967ZM10.75 1.5C10.75 1.08579 10.4142 0.750001 10 0.750001L3.25 0.75C2.83579 0.75 2.5 1.08579 2.5 1.5C2.5 1.91421 2.83579 2.25 3.25 2.25H9.25V8.25C9.25 8.66421 9.58579 9 10 9C10.4142 9 10.75 8.66421 10.75 8.25L10.75 1.5ZM2.03033 10.5303L10.5303 2.03033L9.46967 0.96967L0.96967 9.46967L2.03033 10.5303Z"
          fill={fill ? fill : "#000"}
        />
      </svg>
    </div>
  );
};

export default ArrowRightTop;
