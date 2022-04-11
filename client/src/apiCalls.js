import axios from "axios";

export const loginCall = async (credentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });

  try {
    const res = await axios.post(
      "http://localhost:3004/api/auth/login",
      credentials
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
