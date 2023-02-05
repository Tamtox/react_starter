import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
    darkMode: boolean;
    authToken: string|undefined;
}

const authState:IAuthState = {
    darkMode: false,
    authToken: undefined,
}

const authSlice = createSlice({
    name: "auth",
    initialState:authState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        }
    }
});

export default authSlice;