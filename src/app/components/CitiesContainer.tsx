import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Typography } from '../components';
import { getSearchResults } from '../redux/slices/locationSearchResults';
import { AppDispatch } from '../store/store';

type CityContainerProps = {
	id: number;
	eachCity: string;
	getPreviousData: (id: number, value: string) => void;
	deleteSelectedRecord: (value: string) => void;
};

const CitesWrapper = styled.div`
	background: var(--common-glass-bg);
	padding: 0.5em;
	border-radius: 3px;
	margin: 0.5em;
	display: flex;
	align-items: center;
`;

const IconHolder = styled.div`
	background: var(--common-glass-bg);
	font-size: 0.8em;
	padding: 0.3em;
	margin: 0.3em;
	border-radius: 3px;
	cursor: pointer;
`;

const InputBox = styled.input`
	border: none;
	background: var(--common-glass-bg);
	height: 90%;
	padding: 0 10px;
	text-transform: capitalize;
	color: white;
	font-family: 'Montserrat', sans-serif;
	border-radius: 3px;
`;

const CitiesContainer: React.FC<CityContainerProps> = ({
	id,
	eachCity,
	getPreviousData,
	deleteSelectedRecord
}) => {
	const [edit, setEdit] = React.useState<boolean>(false);
	const [updatedLocationValue, setUpdatedLocationValue] =
		React.useState<string>('');

	const dispatch = useDispatch<AppDispatch>();

	const handleUpdatedLocation = (e: React.ChangeEvent<{ value: unknown }>) => {
		let value: string = e.target.value as string;
		setUpdatedLocationValue(value);
	};

	const handleFinishUpdatingRecord = (id: number) => {
		console.log(updatedLocationValue, 'updatedLocationValue');
		setEdit(false);
		if (updatedLocationValue === '') {
			alert('location cannot be empty');
		} else {
			getPreviousData(id, updatedLocationValue);
		}
	};

	const searchWithPreviousLocation = (value: string) => {
		dispatch(getSearchResults({ mode: 'city', searchQuery: value }));
	};
	return (
		<CitesWrapper>
			{edit ? (
				<InputBox
					value={updatedLocationValue}
					onChange={handleUpdatedLocation}
				/>
			) : (
				<Typography text={eachCity} margin='0 1em 0 0' />
			)}
			{!edit ? (
				<IconHolder
					onClick={() => {
						setUpdatedLocationValue(eachCity);
						setEdit(true);
					}}
				>
					🖊️
				</IconHolder>
			) : (
				<IconHolder
					onClick={() => {
						handleFinishUpdatingRecord(id);
					}}
				>
					✔
				</IconHolder>
			)}

			<IconHolder onClick={() => deleteSelectedRecord(eachCity)}>❌</IconHolder>
			<IconHolder onClick={() => searchWithPreviousLocation(eachCity)}>
				🔍
			</IconHolder>
		</CitesWrapper>
	);
};
export default CitiesContainer;
