import PropTypes from "prop-types";

const Button = ({ text, onClick, key }) => {
  return (
    <button
      key={key}
      className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded m-4 "
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  key: PropTypes.key,
};

export default Button;
