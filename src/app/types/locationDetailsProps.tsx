export type LocationDetailsProps = {
	name: string;
	date: number;
	description: string;
	country: string;
	timezone: number;
	weather: {
		description: string;
	}[];
	sys: {
		country: string;
	};
	main: {
		temp: number;
		pressure: number;
	};
};
