import PropTypes from "prop-types";

const TextButton = ({ text, onClick }) => {
  return (
    <button
      className="text-back text-l hover:font-semibold hover:underline"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TextButton;
