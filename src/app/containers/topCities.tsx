import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '../components';
import { getLocalTime } from '../utils';

import { getTopLocations } from '../redux/slices/topLocations';
import { AppDispatch, RootState } from '../store/store';

import { LocationResponseData } from '../types/errorResponse';

const TopCitiesWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const AllCitiesContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const EachTopCity = styled.div`
	display: flex;
	flex-direction: column;
	background: var(--common-glass-bg);
	margin: 1em;
	padding: 0.5em 1em;
	border-radius: 5px;
`;

const Flex = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const TopCities = () => {
	let topCities = [
		'riyadh',
		'Dammam',
		'Jeddah',
		'Mecca',
		'Al Madinah Al Munawwarah'
	];

	const { isLoading, locations, error } = useSelector(
		(state: RootState) => state.topLocations
	);
	const dispatch = useDispatch<AppDispatch>();

	React.useEffect(() => {
		topCities.map((eachCity) => {
			dispatch(getTopLocations(eachCity));
		});
	}, []);

	if (error?.isError) {
		return <Typography text={error?.message} align='center' />;
	}

	return (
		<TopCitiesWrapper>
			<Typography text='Top cities' align='center' size='1.2em' />
			{isLoading ? (
				<Typography text='Please wait till we fetch weather of top cities' />
			) : (
				<AllCitiesContainer>
					{locations?.map((eachCity: LocationResponseData) => (
						<EachTopCity key={eachCity?.id}>
							<Flex>
								<div>
									<Typography
										text={eachCity.name + ', ' + eachCity?.sys?.country}
										size='0.9em'
									/>
								</div>
								<div>
									<Typography
										text={'⏱️ ' + getLocalTime(eachCity.timezone)}
										size='0.8em'
										align='right'
										margin='0 0 0 1em'
									/>
								</div>
							</Flex>
							<Flex>
								<div>
									<Typography
										text={eachCity?.main?.temp + '° C'}
										size='1.2em'
									/>
								</div>
								<div>
									<Typography
										text={eachCity?.weather[0]?.description}
										size='0.8em'
										align='right'
										margin='0 0 0 0.5em'
									/>
								</div>
							</Flex>
						</EachTopCity>
					))}
				</AllCitiesContainer>
			)}
		</TopCitiesWrapper>
	);
};

export default TopCities;
