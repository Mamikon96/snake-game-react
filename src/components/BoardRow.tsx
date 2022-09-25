import { Field } from "./Field";

interface BoardRowProps {
	cols: number;
	xPos: number | null;
	xPositions: number[] | null;
	giftPos: number | null;
}

export function BoardRow({cols, xPos, xPositions, giftPos}: BoardRowProps) {

	function isRenderPosition(index: number) {
		if (!xPositions || !xPositions.length) return false;
		return xPositions.includes(index);
	}

	return (
		<div className="board-row">
			{
				Array(cols).fill('').map((item, index) => (
					// <Field key={index}
					// 	fill={xPos === index ? true : false}
					// ></Field>

					<Field key={index}
						fill={isRenderPosition(index) ? true : false}
						gift={giftPos === index}
					></Field>
				))
			}
		</div>
	);
}