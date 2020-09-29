import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';
import {GET_JOB, GET_ERRORS} from './types';

export const getjob = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/job');
    dispatch({
      type: GET_JOB,
      payload: res.Data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
