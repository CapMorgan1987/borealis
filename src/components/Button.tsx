import { Link } from 'react-router-dom';
import check from '../assets/check.svg';
import configStore from '../stores/ConfigStore';
import { useLocation } from 'react-router-dom';

interface ButtonProps {
	to?: string;
	title?: string;
	className?: string;
	type?: 'submit' | 'reset' | 'button';
	onClick?: () => void;
}

export default function Button({
	to,
	title,
	onClick,
	className,
	type,
}: ButtonProps) {
	const location = useLocation();

	return (
		<>
			{to ? (
				<Link
					className={`px-3 py-1 rounded bg-primary100 hover:bg-primary200 text-base600 text-lg ${className}`}
					to={to}>
					{title}
				</Link>
			) : (
				<button
					type={type}
					disabled={
						!!configStore.discount.code && location.pathname === '/konfigurator'
					}
					className={`cursor-pointer rounded text-lg ${
						title ?? 'text-primary100 hover:text-primary200'
					} ${className}`}
					onClick={onClick}>
					{title ? <span>{title}</span> : <img src={check} alt='check' />}
				</button>
			)}
		</>
	);
}
