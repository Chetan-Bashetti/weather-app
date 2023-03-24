import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTopLocations = createAsyncThunk(
	'getTopLocationsAction',
	async (location: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL}?q=${location}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
			);
			return response?.data;
		} catch (err: any) {
			return rejectWithValue(err.response.data);
		}
	}
);

const topLocationsSlice = createSlice({
	name: 'topLocationsSlice',
	initialState: {
		locations: [],
		isLoading: false,
		error: {}
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTopLocations.pending, (state, action) => {
			state.isLoading = true;
			state.error = {};
		}),
			builder.addCase(getTopLocations.fulfilled, (state, action) => {
				state.error = {};
				state.locations.push(action.payload);
				state.isLoading = false;
			}),
			builder.addCase(getTopLocations.rejected, (state, action) => {
				state.error = { message: action?.payload?.message, isError: true };
				state.isLoading = false;
			});
	}
});

export default topLocationsSlice.reducer;
