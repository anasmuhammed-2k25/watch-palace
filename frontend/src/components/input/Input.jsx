import "./input.css";

const Input = ({ name, type, value, onChange, errors }) => {
  return (
    <div className="inputBox">
      <label htmlFor={name}>{name}</label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={`Enter your ${name}`}
        onChange={onChange}
      />

      {errors && errors[name] && (
        <p className="error-text">
          {errors[name]}
        </p>
      )}
    </div>
  );
};

export default Input;