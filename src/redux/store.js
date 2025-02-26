import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import eventReducer from "../slices/eventSlice";
import reservationReducer from "../slices/reservationSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    reservations: reservationReducer,
  },
});