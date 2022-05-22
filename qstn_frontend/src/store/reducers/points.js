
import { ADD_POINT,LOAD_POINTS,TOTAL_POINTS } from "../actions/points/types";

// initial state of the POINT store
let initialState = {
  currentPoints: parseInt(localStorage.getItem("points")),

};

const pointsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_POINTS:
     
      return {
        ...state,
        currentPoints:  parseInt(localStorage.getItem("points"))
      };
    
    case ADD_POINT:
      localStorage.setItem("points", state.currentPoints + payload)
      return {
        ...state,
        currentPoints: state.currentPoints + payload,
      };
    
    default:
      return state;
  }
};

export default pointsReducer;

