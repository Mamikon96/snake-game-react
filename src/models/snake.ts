

export interface Direction {
	xDir: number;
	yDir: number;
}

interface Position {
	x: number;
	y: number;
}

interface ISnake {
	head: SnakePart;
}

interface SnakePart {
	next: SnakePart | null;
	data: SnakeData;
}

interface SnakeData {
	position: Position;
}

export class Snake {
	positions: Position[] = [ {x: 0, y: 0} ];

	constructor(positions: Position[]) {
		this.positions = [...positions];
	}

	add(dir: Direction, positions: Position[]): Position[] {
		const firstPos = {...positions[0]};
		let newPositions = this.move(dir, positions);
		newPositions.unshift(firstPos);
		return newPositions;
	}

	move(dir: Direction, positions: Position[]): Position[] {
		const newPositions: Position[] = [...positions];
		for (let i = 0; i < newPositions.length - 1; i++) {
			newPositions[i] = {...newPositions[i + 1]};
		}

		const headPos = newPositions[newPositions.length - 1];
		newPositions[newPositions.length - 1] = {
			...headPos,
			x: headPos.x + dir.xDir,
			y: headPos.y + dir.yDir
		};
		return newPositions;
	}

	hasCycle(positions: Position[]): boolean {
		const allPositionsLength = positions.length;
		const uniquePositionsLength = new Set(positions.map(it => `${it.x}${it.y}`)).size;

		return uniquePositionsLength !== allPositionsLength;
	}

	contains(pos: Position): boolean {
		return this.positions[this.positions.length - 1].x === pos.x 
				&& this.positions[this.positions.length - 1].y === pos.y;
	}

	canMove(dir: Direction, positions: Position[], maxX: number, maxY: number) {
		const {xMin, xMax, yMin, yMax} = this.getMinMaxPositions(positions);
		if (xMin + dir.xDir < 0 
			|| xMax + dir.xDir > maxX - 1 
			|| yMin + dir.yDir < 0 
			|| yMax + dir.yDir > maxY - 1
			|| this.hasCycle(positions)
		) {
			return false;
		}
		return true;
	}

	getMinMaxPositions(positions: Position[]) {
		let xMin = positions[0].x;
		let xMax = xMin;
		let yMin = positions[0].y;
		let yMax = yMin;

		positions.forEach(pos => {
			if (pos.x <= xMin) {
				xMin = pos.x;
			}
			if (pos.x >= xMax) {
				xMax = pos.x;
			}
			if (pos.y <= yMin) {
				yMin = pos.y;
			}
			if (pos.y >= yMax) {
				yMax = pos.y;
			}
		});
		return { xMin, xMax, yMin, yMax };
	}
}