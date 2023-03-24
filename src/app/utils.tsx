import moment from 'moment';

export const getTimeOfTheDay = (time: number, timeZone: number) => {
	let dawnTime = moment
		.utc(time, 'X')
		.add(timeZone, 'seconds')
		.format('HH:mm A');
	return dawnTime;
};

export const getLocalTime = (timezone: number) => {
	const localTime = new Date().getTime();
	const localOffset = new Date().getTimezoneOffset() * 60000;
	const currentUtcTime = localOffset + localTime;
	const cityOffset = currentUtcTime + 1000 * timezone;
	const cityTime = new Date(cityOffset).toTimeString().split(' ');
	var ampm = cityTime[0].split(':')[0] >= 12 ? 'PM' : 'AM';
	let locationLocalTime =
		cityTime[0].split(':')[0] + ':' + cityTime[0].split(':')[1] + ' ' + ampm;
	return locationLocalTime;
};

const storageKey = 'prevSearches';

export const getStoredPrevSearches = () => {
	return JSON.parse(localStorage.getItem(storageKey)) ?? [];
};

export const storeNewlySearchedValue = (location: string) => {
	let previousValue = getStoredPrevSearches();
	if (!previousValue.includes(location.toLowerCase())) {
		let updatedPrevSearches = [...previousValue, location.toLowerCase()];
		localStorage.setItem(storageKey, JSON.stringify(updatedPrevSearches));
	}
};

export const updateExistingStoredSearches = (updatedSearches: string[]) => {
	localStorage.setItem(storageKey, JSON.stringify(updatedSearches));
};
