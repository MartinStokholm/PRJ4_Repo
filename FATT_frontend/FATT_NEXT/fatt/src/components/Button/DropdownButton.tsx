import PropTypes from "prop-types";

const Button = ({ text, onClick, key }) => {
  return (
    <button className="" onClick={onClick} key={key}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
