
interface FieldProps {
	fill: boolean;
	gift: boolean;
}

export function Field({fill, gift}: FieldProps) {

	const baseClassName = 'board_field';

	return (
		<div className={
			fill 
				? baseClassName + ' board_field__filled' 
				: (gift 
						? baseClassName + ' board_field__gift'
						: baseClassName
					)
			}
		></div>
	);
}