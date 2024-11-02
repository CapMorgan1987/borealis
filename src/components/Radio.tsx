import './radio.scss';

interface RadioProps {
	value: string;
	isSelected: boolean;
	onChange: (value: string) => void;
}

export default function Radio({ value, isSelected, onChange }: RadioProps) {
	return (
		<div>
			<label className='custom-radio'>
				<input
					type='radio'
					value={value}
					checked={isSelected}
					onChange={() => onChange(value)}
				/>
				<span className='radio-circle'></span>
				<span className='label'>{value}</span>
			</label>
		</div>
	);
}
