import Button from '../components/Button';
import tools from '../assets/tools-and-utensils.svg';

function App() {
	return (
		<>
			<div className='flex items-center justify-center flex-grow'>
				<div className='flex flex-col  items-center max-w-[540px] text-center'>
					<img src={tools} alt='Tools and utensils' className='pb-4 w-12' />
					<p className='text-3xl text-primary100 pb-4'>Konfigurator Servisa</p>
					<p className='text-lg pb-4'>
						Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i
						naš stručan tim će vam se javiti u najkraćem mogućem roku.
					</p>
					<Button to='/konfigurator' title='Pokreni konfigurator' />
				</div>
			</div>
		</>
	);
}

export default App;
