import PropTypes from "prop-types";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-transparent font-semibold hover:bg-red-400 text-red-400 hover:text-white  py-2 px-4 border border-red-400 hover:border-transparent rounded m-4"
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
