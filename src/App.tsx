import './App.css';
import { Game } from './components/Game';
import { useState, KeyboardEvent, useCallback } from 'react';
import { debounce } from 'lodash';

function App() {

	const [keyCode, setKeyCode] = useState("ArrowRight");

	const debouncedKeyDownHandler = useCallback(
		debounce(keydownHandler, 100),
		[]
	); 
	
	function keydownHandler(e: any) {
		setKeyCode(e.code);
	}

	document.addEventListener('keydown', debouncedKeyDownHandler);

	return (
		<div className="App"
		>
			<Game keyCode={keyCode}></Game>
		</div>
	);
}

export default App;
