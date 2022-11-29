import PropTypes from "prop-types";

const Button = ({ text, onClick, type }) => {
  return (
    <button
      type={type}
      className="mx-auto md:mx-4 my-4 bg-transparent font-semibold hover:bg-green-400 text-green-400 hover:text-white  py-2 px-4 border border-green-400 hover:border-transparent rounded m-4 "
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
