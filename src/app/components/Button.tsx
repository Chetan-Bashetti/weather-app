import React from 'react';
import styled from 'styled-components';
import ButtonProps from '../types/buttonProps';

const StyledButton = styled.button`
	padding: 0.5em;
	border: none;
	background: #020c33;
	border-radius: 3px;
	cursor: pointer;
	position: relative;
	bottom: 3px;
	font-size: 1em;
	color: white;
	font-family: 'Montserrat', sans-serif;
	width: 100px;
	height: 40px;
	margin: 1em;
	@media (min-width: 799px) {
		padding: 1em 3em;
		width: auto;
		height: auto;
	}
`;

const Button: React.FC<ButtonProps> = ({ onClick, title }) => {
	return <StyledButton onClick={onClick}>{title}</StyledButton>;
};

export default Button;
