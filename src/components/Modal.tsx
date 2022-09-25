
interface ModalProps {
	score: number;
	onRestart: () => void;
}

export function Modal({score, onRestart}: ModalProps) {
	return (
		<div className="modal">
			<span className="modal_content">
				Your score: <span className="modal_content-text">{score}</span>
			</span>
			<div className="modal_actions">
				<button className="modal_button" onClick={onRestart}>Restart</button>
				{/* <button className="modal_button" onClick={onCancel}>Cancel</button> */}
			</div>
		</div>
	);
}