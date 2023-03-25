import { getTimeOfTheDay } from '@/app/utils';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import Typography from '../Typography';
import { LightDetailsProps } from '@/app/types/lightDetailsProps';

const LightDetailsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 2em;
`;

const LightDataWrapper = styled.div`
	display: flex;
	align-items: center;
	border: 0.1px solid #88abee;
	margin: 1em 0;
	padding: 0 1.5em;
	border-radius: 5px;
	justify-content: space-between;
`;

const LightDescription = styled.div`
	display: flex;
	align-items: center;
`;

const LightDetails = () => {
	const [sunRiseTime, setSunRiseTime] = React.useState('');
	const [sunSetTime, setSunSet] = React.useState('');

	const searchResult: LightDetailsProps = useSelector(
		(state: RootState) => state.locationSearchResults.searchResult
	);

	React.useEffect(() => {
		let sunRiseTimeOfTheDay = getTimeOfTheDay(
			searchResult?.sys?.sunrise,
			searchResult?.timezone
		);
		let sunSetTimeOfTheday = getTimeOfTheDay(
			searchResult?.sys?.sunset,
			searchResult?.timezone
		);
		setSunRiseTime(sunRiseTimeOfTheDay);
		setSunSet(sunSetTimeOfTheday);
	}, [
		searchResult?.sys?.sunrise,
		searchResult?.sys?.sunset,
		searchResult?.timezone
	]);

	return (
		<LightDetailsWrapper>
			<LightDataWrapper>
				<LightDescription>
					<Typography text='🌤️' size='2em' />
					<Typography
						text='sunrise'
						size='1.2em'
						margin='0 0 0 0.5em'
						weight='200'
					/>
				</LightDescription>
				<Typography
					text={sunRiseTime}
					size='1.5em'
					weight='200'
					align='right'
				/>
			</LightDataWrapper>
			<LightDataWrapper>
				<LightDescription>
					<Typography text='⛅️' size='2em' />
					<Typography
						text='sunset'
						size='1.2em'
						margin='0 0 0 0.5em'
						weight='200'
					/>
				</LightDescription>
				<Typography text={sunSetTime} size='1.5em' weight='200' align='right' />
			</LightDataWrapper>
		</LightDetailsWrapper>
	);
};

export default LightDetails;
