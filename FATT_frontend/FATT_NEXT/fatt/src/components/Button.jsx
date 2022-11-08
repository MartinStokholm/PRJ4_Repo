import PropTypes from "prop-types";

const button = ({ text, onClick }) => {
  return (
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2 "
      onClick={onClick}
    >
      {text}
    </button>
  );
};

button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default button;
