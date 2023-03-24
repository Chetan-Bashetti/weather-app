import { configureStore } from '@reduxjs/toolkit';
import topLocationsReducer from '../redux/slices/topLocations';
import locationSearchResultsReducer from '../redux/slices/locationSearchResults';

export const makeStore = () => {
	return configureStore({
		reducer: {
			topLocations: topLocationsReducer,
			locationSearchResults: locationSearchResultsReducer
		}
	});
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
