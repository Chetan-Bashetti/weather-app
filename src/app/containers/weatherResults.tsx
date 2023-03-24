'use client';

import React from 'react';
import styled from 'styled-components';
import {
	LightDetails,
	LocationDetails,
	TemperatureDetails
} from '../components';

const ResultWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 2;
	padding-top: 2em;
	background: var(--common-glass-bg);
	padding: 1em 2em;
	border-radius: 0.5em;
	margin: 2em auto;
	@media (min-width: 799px) {
		width: 400px;
	}
`;

const WeatherResults = () => {
	return (
		<ResultWrapper>
			<LocationDetails />
			<TemperatureDetails />
			<LightDetails />
		</ResultWrapper>
	);
};

export default WeatherResults;
