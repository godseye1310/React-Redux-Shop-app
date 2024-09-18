import { createSlice } from "@reduxjs/toolkit";

const initialState = { notification: null, notificationIsVisible: false };

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		showNotification: (state, action) => {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
		setShowNotification: (state, action) => {
			state.notificationIsVisible = action.payload;
		},
	},
});
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;

// const sendData
