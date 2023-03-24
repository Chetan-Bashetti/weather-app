import React from 'react';
import styled from 'styled-components';

type TextProps = {
	text?: string | number;
	size?: string;
	margin?: string;
	weight?: string;
	align?: string;
};

type TextStyleProps = TextProps & {
	color?: string;
};

const TextWrapper = styled.div`
	color: ${(props: TextStyleProps) => (props.color ? props.color : 'white')};
	font-size: ${(props: TextStyleProps) => (props.size ? props.size : '1em')};
	font-weight: ${(props: TextStyleProps) =>
		props.weight ? props.weight : '400'};
	margin: ${(props: TextStyleProps) =>
		props.margin ? props.margin : '0.5em 0'};
	text-align: ${(props: TextStyleProps) => (props.align ? props.align : '')};
	text-transform: capitalize;
`;

const Typography: React.FC<TextProps> = ({
	text,
	size,
	margin,
	weight,
	align
}) => {
	return (
		<TextWrapper margin={margin} size={size} weight={weight} align={align}>
			{text}
		</TextWrapper>
	);
};

export default Typography;
