const StarSVG = ({ path, OnClick }) => {
  return (
    <svg
      onClick={OnClick}
      width="53"
      height="47"
      viewBox="0 0 53 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.234 0.744629L35.3585 14.5028L52.1352 18.3867L40.9977 30.7737L42.2418 46.9323L26.234 40.8297L10.2263 46.9323L11.4704 30.7737L0.33293 18.3867L17.1096 14.5028L26.234 0.744629Z"
        fill={path || "#EFEFEF"}
      />
    </svg>
  );
};

export default StarSVG;
