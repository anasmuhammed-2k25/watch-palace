const Button = ({ text, onClick, color, bgcolor }) => {
  return (
    <button
      style={{ backgroundColor: bgcolor, color }}
      className="button"
      type="button"  
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;