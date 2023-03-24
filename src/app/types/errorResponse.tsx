export type LocationResponseData = {
	id: number;
	name: string;
	sys: { country: string };
	dt: number;
	main: { temp: string };
	weather: { description: string }[];
	timezone: number;
};
