import './checkbox.scss';

interface CheckboxProps {
	value: string;
	price: number;
	isSelected: boolean;
	onChange: (value: string) => void;
}

export default function Checkbox({
	value,
	price,
	isSelected,
	onChange,
}: CheckboxProps) {
	return (
		<label className='custom-checkbox'>
			<input
				type='checkbox'
				value={value}
				checked={isSelected}
				onChange={() => onChange(value)}
			/>
			<span className='checkbox-square'>
				<span className='checkmark'></span>
			</span>
			<span className='text-base'>
				{value} - <span className='text-primary100'>({price}€)</span>
			</span>
		</label>
	);
}
