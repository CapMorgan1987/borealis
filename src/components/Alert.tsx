import { AlertProps } from '../types/configurator';

export default function Alert({ alertText, className }: AlertProps) {
	return (
		<div
			className={`fixed bottom-10 right-10 p-6 max-w-[650px] bg-error transition rounded text-base600 font-bold ${className}`}>
			{alertText}
		</div>
	);
}
