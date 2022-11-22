import PropTypes from "prop-types";

const Button = ({ text, onClick }) => {
  return (
    <button className="text-white text-xl  place-self-end" onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
