import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { storeNewlySearchedValue } from '@/app/utils';

export const getSearchResults = createAsyncThunk(
	'getSearchResultsAction',
	async (data: object, { rejectWithValue }) => {
		try {
			let response = await axios.get(
				data?.mode === 'city'
					? `${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL}?q=${data?.searchQuery}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
					: `${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL}?lat=${data?.lat}&lon=${data?.long}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
			);

			storeNewlySearchedValue(response?.data?.name);
			return response.data;
		} catch (err: any) {
			return rejectWithValue(err.response.data);
		}
	}
);

const locationResultsSlice = createSlice({
	name: 'locationResultsSlice',
	initialState: {
		searchResult: {},
		isLoading: false,
		error: {}
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getSearchResults.pending, (state, action) => {
			state.isLoading = true;
			state.error = {};
		}),
			builder.addCase(getSearchResults.fulfilled, (state, action) => {
				state.error = {};
				state.searchResult = action.payload;
				state.isLoading = false;
			}),
			builder.addCase(getSearchResults.rejected, (state, action) => {
				state.error = { message: action?.payload?.message, isError: true };
				state.isLoading = false;
			});
	}
});

export default locationResultsSlice.reducer;
