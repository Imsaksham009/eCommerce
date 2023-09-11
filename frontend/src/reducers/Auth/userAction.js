import axios from "axios";
import { loginFail, loginRequest, loginSuccess, logouFail, logoutRequest, logoutSuccess, registerFail, registerRequest, registerSuccess } from "./userReducer";

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};
export const login = async (dispatch, email, password) => {


    try {
        dispatch(loginRequest());
        const { data } = await axios.post("/api/v1/user/login", { email, password }, config);
        dispatch(loginSuccess(data.user));
    } catch (error) {
        dispatch(loginFail(error.response.data.message));
    }
};

export const register = async (dispatch, myForm) => {
    try {
        dispatch(registerRequest());
        const { data } = await axios.post("/api/v1/user/register", myForm, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch(registerSuccess(data.user));


    } catch (error) {
        dispatch(registerFail(error.response.data.message));

    }
};

export const logout = async (dispatch) => {
    try {
        dispatch(logoutRequest());
        //eslint-disable-next-line
        const { data } = await axios.get("/api/v1/user/logout");
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logouFail(error));
    }
};