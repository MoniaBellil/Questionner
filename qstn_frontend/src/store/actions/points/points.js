import api from "../../../axiosConfig";
import { ADD_POINT, TOTAL_POINTS } from "./types";

//add point

export const add = (point) => (dispatch) => {
  dispatch({ type: ADD_POINT, payload: point });
  let totalPoints = parseInt(localStorage.getItem("points"));
  let userId = localStorage.getItem("id");

  const updatePoints = {
    idUser: userId,
    totalPoint: totalPoints,
  };
  dispatch(sum(updatePoints));
};

export const sum = (updatePoints) => async (dispatch) => {
  try {
    const { data } = await api.post("users/updatePoint", updatePoints);
    dispatch({ type: TOTAL_POINTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
