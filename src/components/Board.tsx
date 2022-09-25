
import { BoardRow } from './BoardRow';
interface BoardProps {
	rows: number;
	cols: number;
	headPos: {
		x: number;
		y: number;
	}
	positions: {
		x: number;
		y: number;
	}[]
	giftPos: {
		x: number;
		y: number;
	}
}

export function Board({ rows, cols, headPos, positions, giftPos }: BoardProps) {
	return (
		<div className="board">
			{
				Array(rows).fill('')
					.map((row, index) => {
						const xPositions = positions.filter(item => item.y === index)
							.map(item => item.x);

						return (
							<BoardRow
								cols={cols}
								key={index}
								xPos={index === headPos.y ? headPos.x : null}
								xPositions={xPositions}
								giftPos={index === giftPos.y ? giftPos.x : null}
							></BoardRow>
						)
					}
					)
			}
		</div>
	);
}