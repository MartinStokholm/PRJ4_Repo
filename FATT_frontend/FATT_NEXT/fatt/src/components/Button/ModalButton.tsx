import PropTypes from "prop-types";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-white font-semibold text-green-400 place-self-end border-t-l-r rounded-t px-3 pt-1 hover:text-red-400 "
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
