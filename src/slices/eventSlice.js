import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await api.get("/events");
  return response.data;
});

const eventSlice = createSlice({
  name: "events",
  initialState: { events: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => { state.loading = true; })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      });
  },
});

export default eventSlice.reducer;