import React from 'react';
import styled from 'styled-components';
import { Typography } from '../components';
import { getStoredPrevSearches, updateExistingStoredSearches } from '../utils';

import CitiesContainer from '../components/CitiesContainer';

const PrevSearchesWrapper = styled.div`
	display: flex;
	margin: 1em;
	flex-direction: column;
`;

const SearchesAccordion = styled.div`
	display: flex;
	flex-direction: column;
`;
const AccordionHeader = styled.div`
	background: var(--common-glass-bg);
	padding: 0 1em;
	border-radius: 7px 7px 2px 0;
	display: flex;
	justify-content: space-between;
`;

const AccordionBody = styled.div`
	display: flex;
	flex-wrap: wrap;
	border: 1px solid var(--common-glass-bg);
`;

const AccordionIncicator = styled.div`
	display: flex;
	align-items: center;
`;

const PreviousSearches = () => {
	const [openAccordion, setOpenAccordion] = React.useState<boolean>(false);
	const [prevSearchResults, setPrevSearchResults] = React.useState<string[]>(
		[]
	);

	React.useEffect(() => {
		getPreviousData();
	}, []);

	const getPreviousData = () => {
		let prevSearches = getStoredPrevSearches();
		setPrevSearchResults(prevSearches);
	};

	const updatedSelectedRecord = (id: number, value: string) => {
		let updatedLocation = [...prevSearchResults];
		if (updatedLocation.includes(value)) {
			alert('location already exists');
		} else {
			updatedLocation[id] = value;
			updateExistingStoredSearches(updatedLocation);
			getPreviousData();
		}
	};

	const deleteSelectedRecord = (value: string) => {
		let updatedLocations = [...prevSearchResults];
		let filteredLocations = updatedLocations.filter(
			(eachLocation) => eachLocation !== value
		);
		updateExistingStoredSearches(filteredLocations);
		getPreviousData();
	};

	return prevSearchResults?.length ? (
		<PrevSearchesWrapper>
			<Typography text='Previous searches' align='center' />
			<SearchesAccordion>
				<AccordionHeader onClick={() => setOpenAccordion(!openAccordion)}>
					<Typography text='View and update previous searches - click here to see last searches' />
					{openAccordion ? (
						<AccordionIncicator>−</AccordionIncicator>
					) : (
						<AccordionIncicator>＋</AccordionIncicator>
					)}
				</AccordionHeader>
				{openAccordion && (
					<AccordionBody>
						{prevSearchResults?.map((eachCity, id) => (
							<CitiesContainer
								key={id}
								id={id}
								eachCity={eachCity}
								getPreviousData={(id, value) =>
									updatedSelectedRecord(id, value)
								}
								deleteSelectedRecord={(value) => deleteSelectedRecord(value)}
							/>
						))}
					</AccordionBody>
				)}
			</SearchesAccordion>
		</PrevSearchesWrapper>
	) : (
		<div></div>
	);
};

export default PreviousSearches;
