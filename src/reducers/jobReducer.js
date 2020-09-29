import {GET_JOB} from '../actions/types';
const intialState = {
  post: [],
};

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_JOB:
      return {
        ...state,
        post: action.payload,
      };

    default:
      return state;
  }
}
