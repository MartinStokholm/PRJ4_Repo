import axios from "axios";
import { server } from "../../config/config";
import PropTypes from "prop-types";

const Fecth = ({ type }) => {
  return axios.get(`${server}type`);
};

export default Fecth;

Fecth.propType = {
  type: PropTypes.string.isRequired,
};
