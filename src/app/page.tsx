'use client';

import styles from './page.module.css';

// Containers
import { WeatherSearch, TopCities } from './containers';

export default function Home() {
	return (
		<main className={styles.main}>
			<WeatherSearch />
			<TopCities />
		</main>
	);
}
