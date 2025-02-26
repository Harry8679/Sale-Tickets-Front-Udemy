import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const createReservation = createAsyncThunk(
  'reservation/create',
  async (reservationData, thunkAPI) => {
    const { data } = await api.post('/reservations', reservationData);
    return data;
  }
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: { reservations: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reservationSlice.reducer;