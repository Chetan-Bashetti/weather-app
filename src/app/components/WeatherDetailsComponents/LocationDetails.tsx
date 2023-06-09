import { getTimeOfTheDay, getLocalTime } from '@/app/utils';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import Typography from '../Typography';
import { LocationDetailsProps } from '@/app/types/locationDetailsProps';

const LocationDetailsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 0.1px solid #88abee;
	padding-bottom: 1em;
`;

const PlaceTimeDetails = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const LocationDescription = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const LocationDetails = () => {
	const [locationTime, setUpdatedTime] = React.useState<string>('');
	const searchResult: LocationDetailsProps = useSelector(
		(state: RootState) => state.locationSearchResults.searchResult
	);

	useEffect(() => {
		let timeOfTheDay = getLocalTime(searchResult?.timezone);
		setUpdatedTime(timeOfTheDay);
	}, [searchResult?.timezone]);

	return (
		<LocationDetailsWrapper>
			<PlaceTimeDetails>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Typography
						text={searchResult.name + ', ' + searchResult?.sys?.country}
						size='1.2em'
					/>
				</div>
				<Typography text={locationTime} size='1em' align='right' />
			</PlaceTimeDetails>
			<PlaceTimeDetails>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Typography
						text={`${searchResult?.main?.temp}° C`}
						size='2em'
						margin='0 0 0 0 '
						weight='200'
					/>
					{searchResult?.weather?.length && (
						<img
							src={`http://openweathermap.org/img/wn/${searchResult?.weather[0]?.icon}.png`}
						/>
					)}
				</div>
				<LocationDescription>
					{searchResult?.weather?.length && (
						<Typography
							text={searchResult?.weather[0]?.description}
							margin='0'
							align='right'
						/>
					)}
					<Typography
						text={`pressure 💨 ${searchResult?.main?.pressure}`}
						size='0.8em'
						align='right'
					/>
				</LocationDescription>
			</PlaceTimeDetails>
		</LocationDetailsWrapper>
	);
};

export default LocationDetails;
