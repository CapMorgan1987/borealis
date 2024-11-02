import Button from '../components/Button';

export default function ErrorPage() {
	return (
		<div className='flex flex-col items-center justify-center flex-grow bg-bg200'>
			<h1 className='text-primary100 font-bold text-6xl pb-6'>
				Page Not Found
			</h1>
			<Button to='/' title='Home' />
		</div>
	);
}
