import { createSlice } from "@reduxjs/toolkit";
import loginAPI from "../../api/login";
import { account,login } from "../../interface";

export interface stateLogin {
    accountLogin?: account,
    token?:string,
    message?:string
}

const initialState : stateLogin = {
    accountLogin: undefined,
    token: '',
    message:''
}

const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        genToken:(state, action) => {
            if (action.payload.success == -1) {
                state.message = 'incorrect username or password!'
            } else {
                state.token = action.payload.token
                state.message = 'get go'
            }
        },
        verifyToken:(state, action) => {
            if (action.payload.success == -1) {
                state.message = 'incorrect token!'
            } else {
                state.accountLogin = action.payload
            }
        },
        logOut:(state) => {
            state.accountLogin = undefined
            state.token = ''
            state.message = ''
        } 
    }
})

export const genTokenAsync = (data:login) => async (dispatch:any) => {
    loginAPI.genToken(data).then((res) => {
        dispatch(loginAction.genToken(res.data))
    }).catch((error) => {
        console.log(error);
    })
}

export const verifyTokenAsync = (token:string) => async (dispatch:any) => {
    loginAPI.verifyToken(token).then((res) => {
        dispatch(loginAction.verifyToken(res.data))
    }).then((error) => {
        console.log(error);
    })
}

// export const logIn = (data:login) => async (dispatch:any) => {

// }

export const loginAction = loginSlice.actions
export default loginSlice.reducer