import { useEffect } from 'react';
import styled from 'styled-components';
import InputFieldProps from '../types/inputFieldProps';

type SearchBoxStyleProps = {
	margin?: string;
};

const InputBoxWrapper = styled.div`
	flex: 1;
	margin-left: ${(props: SearchBoxStyleProps) =>
		props?.margin ? props?.margin : '0'};
`;

const InputBox = styled.input`
	width: 100%;
	height: 40px;
	outline: none;
	background: var(--common-glass-bg);
	border: none;
	border-radius: 3px;
	color: white;
	padding: 0 1em;
	font-family: 'Montserrat', sans-serif;
	font-size: 1em;
	::placeholder {
		color: lightgray;
	}
`;

const SearchBox: React.FC<InputFieldProps> = ({
	value,
	onChange,
	placeholder,
	type,
	margin
}) => {
	return (
		<InputBoxWrapper margin={margin}>
			<InputBox
				placeholder={placeholder}
				value={value}
				onChange={(e) => {
					if (type === 'city') {
						onChange(e);
					} else {
						const re = /^[0-9.\b]+$/;
						if (e.target.value === '' || re.test(e.target.value)) {
							onChange(e);
						}
					}
				}}
			/>
		</InputBoxWrapper>
	);
};

export default SearchBox;
