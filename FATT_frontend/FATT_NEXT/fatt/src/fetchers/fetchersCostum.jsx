import axios from "axios";
import { server } from "../../config/server"
import PropTypes from 'prop-types';

const fecth = ({type}) => {
    return axios.get(`${server}type`)
  }

  export default fecth;

  fecth.propType = {
    type: PropTypes.string.isRequired,
  };