import axios from "axios";
import { loginFail, loginRequest, loginSuccess, logouFail, logoutRequest, logoutSuccess, registerFail, registerRequest, registerSuccess } from "./userReducer";
import { updatePasswordFail, updatePasswordRequest, updatePasswordSuccess } from "./updatePasswordReducer";
import { forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess } from "./forgotPasswordReducer";

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

//login user
export const login = async (dispatch, email, password) => {


    try {
        dispatch(loginRequest());
        const { data } = await axios.post("/api/v1/user/login", { email, password }, config);
        dispatch(loginSuccess(data.user));
    } catch (error) {
        dispatch(loginFail(error.response.data.message));
    }
};

//register user
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


//user logout
export const logout = async (dispatch) => {
    try {
        dispatch(logoutRequest());
        //eslint-disable-next-line
        const { data } = await axios.get("/api/v1/user/logout");
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logouFail(error.response.data.message));
    }
};


//update Password

export const updatePassword = async (dispatch, oldpassword, password, confirmPassword) => {
    try {
        dispatch(updatePasswordRequest());
        const { data } = await axios.put("/api/v1/user/changepassword", { oldpassword, password, confirmPassword }, config);
        dispatch(updatePasswordSuccess(data.success));
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message));
    }
};

//forgot Password
export const forgotPassword = async (dispatch, email) => {
    try {
        dispatch(forgotPasswordRequest());
        const { data } = await axios.post("/api/v1/user/resetpassword", { email }, config);
        dispatch(forgotPasswordSuccess(data));
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message));
    }
};

//reset password
export const resetPassword = async (dispatch, token, password, confirmPassword) => {
    try {
        dispatch(resetPasswordRequest());
        const { data } = await axios.put(`/api/v1/user/password/reset/${token}`, { password, confirmPassword }, config);
        dispatch(resetPasswordSuccess(data));

    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message));
    }
};