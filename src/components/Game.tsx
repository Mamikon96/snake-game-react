import { useEffect, useState } from "react";
import { Board } from "./Board";
import { Direction, Snake } from "./../models/snake";
import { random } from "lodash";
import { Modal } from "./Modal";
import { Overlay } from "./Overlay";


interface GameProps {
	keyCode: string;
}


export function Game({ keyCode }: GameProps) {

	const [tickDelay, setTickDelay] = useState(100);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [positions, setPositions] = useState([
		{ x: 0, y: 0 },
		{ x: 1, y: 0 },
		{ x: 2, y: 0 },
		{ x: 3, y: 0 },
		{ x: 4, y: 0 },
		{ x: 5, y: 0 },
		{ x: 6, y: 0 },
	]);
	const [dir, setDir] = useState({ xDir: 0, yDir: 0 });
	const [giftPos, setGiftPos] = useState({ x: 10, y: 5 });
	const [gameStatus, setGameStatus] = useState('');
	const [stopGame, setStopGame] = useState(false);
	const [score, setScore] = useState(0);

	const rows = 20;
	const cols = 20;
	const snake: Snake = new Snake(positions);


	useEffect(() => {
		if (!continueGame()) return;
		updateDirection(keyCode);
	}, [keyCode]);

	useEffect(() => {
		if (!continueGame()) return;
		const id = setInterval(() => {
			// snake with one field
			// setPos((prev) => {
			// 	if (!validatePos(prev)) return {...prev};
			// 	return {...prev, x: prev.x + dir.xDir, y: prev.y + dir.yDir}
			// });

			// snake with many fields (in progress)
			if (!snake.canMove(dir, positions, cols, rows)) {
				if (snake.hasCycle(positions)) {
					setGameStatus('Game Over !!!');
					setStopGame(true);
					// clearInterval(id);
				}
				return;
			}
			if (snake.contains(giftPos)) {
				setPositions(snake.add(dir, positions));
				setScore(positions.length ** 2);
				renderRandomGift();
			}
			else {
				setPositions(snake.move(dir, positions));
			}
			return;
		}, tickDelay);
		return () => clearInterval(id);
	}, [dir, positions]);

	useEffect(() => {
		if (!continueGame()) return;
		const id = setInterval(() => {
			if (stopGame) {
				setGiftPos({ x: -1, y: -1 });
				return;
			}
			renderRandomGift();
		}, 5000);
		return () => clearInterval(id);
	}, [giftPos, stopGame]);


	function initGame(): void {
		setPositions([
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 3, y: 0 },
			{ x: 4, y: 0 },
			{ x: 5, y: 0 },
			{ x: 6, y: 0 },
		]);
	}

	function continueGame(): boolean {
		// return !gameStatus || gameStatus.length === 0;
		return !stopGame;
	}

	function renderRandomGift() {
		const x = random(0, cols - 1);
		const y = random(0, rows - 1);
		setGiftPos({ x, y });
	}

	function updateDirection(keyCode: string) {
		switch (keyCode) {
			case "ArrowUp":
				if (dir.yDir === 1) return;
				update({ xDir: 0, yDir: -1 });
				break;
			case "ArrowRight":
				if (dir.xDir === -1) return;
				update({ xDir: 1, yDir: 0 });
				break;
			case "ArrowDown":
				if (dir.yDir === -1) return;
				update({ xDir: 0, yDir: 1 });
				break;
			case "ArrowLeft":
				if (dir.xDir === 1) return;
				update({ xDir: -1, yDir: 0 });
				break;
		}
	}

	function update({ xDir, yDir }: Direction) {
		setDir({ ...dir, xDir, yDir });
		const newPositions = snake.move({ xDir, yDir }, positions);
		setPositions(newPositions);
	}

	// function validatePos(pos: any): boolean {
	// 	if (pos.x + dir.xDir < 0
	// 		|| pos.x + dir.xDir > cols - 1
	// 		|| pos.y + dir.yDir < 0
	// 		|| pos.y + dir.yDir > rows - 1) {
	// 		return false;
	// 	}
	// 	return true;
	// }

	function onRestart(): void {
		setGameStatus('');
		initGame();
		setStopGame(false);
	}


	return (
		<div className="game">
			<div className="game-info">
				<span className="game-info_item">
					Score: {score}
				</span>
			</div>
			
			<Board
				rows={rows}
				cols={cols}
				headPos={pos}
				positions={positions}
				giftPos={giftPos}
			></Board>
			
			{stopGame && (
				<Overlay>
					<Modal score={score} onRestart={onRestart}></Modal>
				</Overlay>
			)}
			{/* <input className="snake-head"></input> */}
		</div>
	);
}