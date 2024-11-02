import { TitleProps } from '../types/configurator';

export default function Title({ title }: TitleProps) {
	return <h3 className='text-lg text-primary100 font-bold pb-2'>{title}</h3>;
}
