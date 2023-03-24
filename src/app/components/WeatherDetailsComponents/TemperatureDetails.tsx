import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import Typography from '../Typography';

import { TemperatureDetailsProps } from '@/app/types/tempratureDetailsProps';

const TemperatureDetailsWrapper = styled.div`
	display: flex;
	align-itmes: center;
	justify-content: space-evenly;
`;

const TemperatureData = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 1.5em;
`;

const TemperatureDetails = () => {
	const searchResult: TemperatureDetailsProps = useSelector(
		(state: RootState) => state.locationSearchResults.searchResult
	);

	return (
		<TemperatureDetailsWrapper>
			<TemperatureData>
				<Typography
					text={searchResult?.main?.feels_like}
					size='1.5em'
					margin='0.5em 0 0 0'
				/>
				<Typography text='feels like' size='0.8em' margin='0' />
			</TemperatureData>

			<TemperatureData>
				<Typography
					text={searchResult?.main?.temp_min}
					size='1.5em'
					margin='0.5em 0 0 0'
				/>
				<Typography text='min temp' size='0.8em' margin='0' />
			</TemperatureData>

			<TemperatureData>
				<Typography
					text={searchResult?.main?.temp_max}
					size='1.5em'
					margin='0.5em 0 0 0'
				/>
				<Typography text='max temp' size='0.8em' margin='0' />
			</TemperatureData>
		</TemperatureDetailsWrapper>
	);
};

export default TemperatureDetails;
