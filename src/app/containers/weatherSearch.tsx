'use client';

import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getSearchResults } from '../redux/slices/locationSearchResults';

import { SearchBox, Select, Typography, Button } from '../components';

import WeatherResults from './weatherResults';
import PreviousSearches from './previousSearches';

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const SearchContentActionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	@media (min-width: 799px) {
		width: 800px;
		margin: auto;
	}
`;

const SearchDetailsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	@media (max-width: 699px) {
		flex-direction: column;
	}
`;

const EachMode = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	margin: 1em;
	justify-content: flex-end;
	@media (max-width: 699px) {
		margin: 0em;
	}
`;

const LongLatComponentsWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: 'row';
	justify-content: flex-end;
	align-items: center;
	@media (max-width: 699px) {
		margin: 0em;
	}
`;

const ActionsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 1em;
`;

const DeviderLine = styled.div`
	border-bottom: 0.1px solid #88abee;
	padding-bottom: 1em;
`;

const WeatherSearch = () => {
	const [mode, setMode] = React.useState<string>('city');
	const [lat, setLat] = React.useState<number>(0);
	const [long, setLong] = React.useState<number>(0);
	const [searchQuery, setSearchQuery] = React.useState<string>('');

	const dispatch = useDispatch<AppDispatch>();

	const { isLoading, error } = useSelector(
		(state: RootState) => state.locationSearchResults
	);

	React.useEffect(() => {
		window.document.title = 'Weather App - Tamkeen Technologies';
		dispatch(getSearchResults({ mode: 'city', searchQuery: 'riyad' }));
	}, []);

	const onModeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setMode(event.target.value as string);
	};

	const handleLocationLat = (event: React.ChangeEvent<{ value: unknown }>) => {
		setLat(event.target.value as number);
	};

	const handleLocationLong = (event: React.ChangeEvent<{ value: unknown }>) => {
		setLong(event.target.value as number);
	};

	const handleSearchByCity = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSearchQuery(event.target.value as string);
	};

	const handlePrepareQueryUrl = () => {
		if (mode === 'city') {
			dispatch(getSearchResults({ mode: 'city', searchQuery }));
		} else {
			dispatch(getSearchResults({ mode: 'lat-long', lat, long }));
		}
	};

	const handleReset = () => {
		setLat(0);
		setLong(0);
		setSearchQuery('');
	};

	const checkSearchDisabled = () => {
		if (mode === 'city' && searchQuery === '') {
			alert('Please enter a valid city name');
			return;
		}
		if (mode !== 'city') {
			if (lat <= 0 || long <= 0) {
				alert('Please enter a valid lat long of the city');
				return;
			}
		}
		handlePrepareQueryUrl();
	};

	return (
		<Wrapper>
			<SearchContentActionWrapper>
				<SearchDetailsWrapper>
					<EachMode>
						<Typography text='Search By' />
						<Select mode={mode} onSelect={(val) => onModeChange(val)} />
					</EachMode>
					<EachMode>
						<Typography
							text={`Enter ${mode === 'city' ? 'city' : 'Long - Let'}`}
						/>
						{mode === 'city' ? (
							<SearchBox
								placeholder='Enter City Name'
								value={searchQuery}
								onChange={(e) => handleSearchByCity(e)}
								type={mode}
							/>
						) : (
							<div style={{ display: 'flex' }}>
								<LongLatComponentsWrapper>
									<Typography text='Long - ' margin='0 0.5em 0.2em 0em' />
									<SearchBox
										placeholder='Long'
										value={long}
										onChange={(e) => handleLocationLong(e)}
										type={mode}
									/>
								</LongLatComponentsWrapper>
								<LongLatComponentsWrapper>
									<Typography text='Lat - ' margin='0 0em 0.2em 1em' />
									<SearchBox
										placeholder='Lat'
										value={lat}
										onChange={(e) => handleLocationLat(e)}
										type={mode}
										margin='1em'
									/>
								</LongLatComponentsWrapper>
							</div>
						)}
					</EachMode>
				</SearchDetailsWrapper>
				<ActionsWrapper>
					<Button onClick={() => checkSearchDisabled()} title='Search' />
					<Button onClick={handleReset} title='Clear' />
				</ActionsWrapper>
				{!isLoading ? <PreviousSearches /> : ''}
				<DeviderLine />
			</SearchContentActionWrapper>
			{isLoading ? (
				<Typography
					text='Please wait till we fetch weather of top cities'
					align='center'
				/>
			) : (
				<div>
					{error?.isError ? (
						<Typography text={error?.message} align='center' />
					) : (
						<WeatherResults />
					)}
				</div>
			)}
		</Wrapper>
	);
};

export default WeatherSearch;
