import { useState } from 'react';
import configStore from '../stores/ConfigStore';
import { useNavigate } from 'react-router-dom';
import { Manufacturer, Service, Discount, Form } from '../types/configurator';
import Button from '../components/Button';
import Title from '../components/Title';
import Alert from '../components/Alert';

function App() {
	const navigate = useNavigate();
	const [alert, setAlert] = useState('' as string);

	const backApi =
		'https://fe-interview-project-backend.accounts-a35.workers.dev/';

	const serviceIds = configStore.services.map((service) => service.id);

	async function send() {
		const messagebody = {
			manufacturerId: configStore.manufacturer.id,
			serviceIds: serviceIds,
			promoCode: configStore.discount.id,
			fullName: configStore.form.name,
			email: configStore.form.email,
			phoneNumber: configStore.form.phone,
			note: configStore.form.message,
		};

		try {
			const response = await fetch(backApi + 'api/contact', {
				method: 'POST',
				headers: {
					'x-authentication-token': 'borealis-fe-interview-token',
				},
				body: JSON.stringify(messagebody),
			});

			if (response.ok) {
				configStore.setManufacturer({} as Manufacturer);
				configStore.setDiscount({} as Discount);
				configStore.setServices([] as Service[]);
				configStore.setTotalPrice(0 as number);
				configStore.setRawPrice(0 as number);
				configStore.setForm({} as Form);
				setAlert('Poruka uspjesno poslana!');
				setTimeout(() => {
					navigate('/');
				}, 1500);
			}
		} catch (error) {
			setAlert(`Greska: ${error}`);
		}
	}

	return (
		<>
			<div className='flex flex-col items-center pt-8'>
				<div className='max-w-[600px] w-full'>
					<h1 className='text-4xl font-bold pb-4'>Konfigurator Servisa</h1>
					<Title title='Pregled i potvrda vašeg odabira' />
					<p className='text-base'>
						Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko
						želite promijeniti neki od podataka, vratite se na prethodni korak.
						Kada ste provjerili ispravnost svojih podataka, za slanje upita na
						servis pritisnite gumb “Pošalji”.
					</p>
					<div className='w-full bg-bg200 p-4'>
						<Title title='Model vozila' />
						<p className='text-base pb-3'>{configStore.manufacturer.name}</p>
						<Title title='Odabrane usluge' />
						{configStore.services.map((service: Service) => (
							<div className='flex justify-between p-1' key={service.id}>
								<p className='text-base'>{service.name}</p>
								<p className='text-base ml-4'>
									{Number(service.price).toFixed(2)} €
								</p>
							</div>
						))}
						<div className='flex justify-end'>
							{configStore.discount.discountPercentage ? (
								<div>
									<p className='text-base'>
										Popust {configStore.discount.discountPercentage}%:
										<span className='ml-4'>
											-
											{Number(
												configStore.rawPrice - configStore.totalPrice
											).toFixed(2)}{' '}
											€
										</span>
									</p>
								</div>
							) : (
								''
							)}
						</div>
						<div className='flex justify-end'>
							<div>
								<p className='text-base'>
									Ukupno:
									<span className='ml-4 text-primary100 font-bold'>
										{Number(configStore.totalPrice).toFixed(2)}€ €
									</span>
								</p>
							</div>
						</div>
						<div className='pt-3 pb-4'>
							<Title title='Kontakt podaci' />
							<p className='text-base flex items-center'>
								<span className='w-[110px] mr-4'>Ime i prezime:</span>
								{configStore.form.name}
							</p>
							<p className='text-base flex items-center'>
								<span className='w-[110px] mr-4'> Email adresa:</span>
								{configStore.form.email}
							</p>
							<p className='text-base flex items-center'>
								<span className='w-[110px] mr-4'>Broj telefona:</span>
								{configStore.form.phone}
							</p>
							<p className='text-base flex items-center'>
								<span className='w-[110px] mr-4'>Napomena:</span>
								{configStore.form.message}
							</p>
						</div>
					</div>
					<div className='flex w-full gap-4 mt-4'>
						<Button
							to={'/konfigurator'}
							title='Natrag'
							className='flex justify-center items-center !border !border-base100 !text-base100 !bg-base600'
						/>
						<Button
							className='flex justify-center items-center w-full bg-primary100 text-base600'
							onClick={() => send()}
							title='Pošalji'
							type='button'
						/>
					</div>
				</div>
				{alert ? <Alert alertText={alert} className='!bg-primary100' /> : ''}
			</div>
		</>
	);
}

export default App;
