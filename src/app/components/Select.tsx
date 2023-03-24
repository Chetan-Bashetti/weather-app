import React from 'react';
import styled from 'styled-components';

import { ModeTypeSelectionProps } from '../types/modeType';

const border = '1px solid #88abee';

const SelectWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const SelectedModeWrapper = styled.select`
	width: 100%;
	height: 40px;
	outline: none;
	background: var(--common-glass-bg);
	border: none;
	border-radius: 3px;
	color: white;
	padding: 0em 1em;
	font-family: 'Montserrat', sans-serif;
	font-size: 1em;
`;

const EachModeWrapper = styled.option`
	padding: 1em;
	&:hover {
	}
`;

const Select: React.FC<ModeTypeSelectionProps> = ({ mode = '', onSelect }) => {
	const [availableModes, setAvailableModes] = React.useState([
		'lat-long',
		'city'
	]);

	return (
		<SelectWrapper>
			<SelectedModeWrapper value={mode} onChange={(e) => onSelect(e)}>
				{availableModes?.map((eachMode) => (
					<EachModeWrapper key={eachMode} value={eachMode} defaultValue={mode}>
						By {eachMode}
					</EachModeWrapper>
				))}
			</SelectedModeWrapper>
		</SelectWrapper>
	);
};

export default Select;
