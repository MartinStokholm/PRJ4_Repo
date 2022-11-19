import PropTypes from "prop-types";

const Button = ({ text, onClick, key, type }) => {
  return (
    <button
      type={type}
      key={key}
      className="mx-auto my-4 col-span-2 bg-transparent font-semibold hover:bg-green-500 text-green-500 hover:text-white  py-2 px-4 border border-green-500 hover:border-transparent rounded m-4 "
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
