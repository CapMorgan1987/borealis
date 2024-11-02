import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Radio from '../components/Radio';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Alert from '../components/Alert';
import FormComponent from '../components/Form';
import { observer } from 'mobx-react-lite';
import { Manufacturer, Service, Discount } from '../types/configurator';
import configStore from '../stores/ConfigStore';
import calculatePrice from '../helpers/calculatePrice';
import close from '../assets/close-icon.svg';

const Configurator = observer(() => {
	const navigate = useNavigate();
	const [manufacturers, setManufacturers] = useState([] as Manufacturer[]);
	const [services, setServices] = useState([] as Service[]);
	const [discountCode, setDiscountCode] = useState('' as string);
	const [inputVisible, setInputVisible] = useState(false as boolean);
	const [alert, setAlert] = useState('' as string);

	const handleSetInputVisible = () => {
		setInputVisible(true);
	};

	const handleDiscountCode = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDiscountCode(event.target.value);
	};

	const handleselectedManufacturer = (manufacturer: Manufacturer) => {
		configStore.setManufacturer(manufacturer);
	};

	const handleCheckboxChange = (service: Service) => {
		const updatedServices = configStore.services.some(
			(s) => s.id === service.id
		)
			? configStore.services.filter((s) => s.id !== service.id)
			: [...configStore.services, service];

		configStore.setServices(updatedServices);
	};

	const backApi =
		'https://fe-interview-project-backend.accounts-a35.workers.dev/';

	async function fetchManufacturers(): Promise<Manufacturer[]> {
		const response = await fetch(backApi + 'api/manufacturers', {
			headers: {
				'x-authentication-token': 'borealis-fe-interview-token',
			},
		});
		const data = await response.json();
		return data;
	}

	async function fetchServices(): Promise<Service[]> {
		const response = await fetch(backApi + 'api/services', {
			headers: {
				'x-authentication-token': 'borealis-fe-interview-token',
			},
		});
		const data = await response.json();
		return data;
	}

	async function checkCode(discountCode: string) {
		try {
			const response = await fetch(
				backApi + `api/validate-promo-code/${discountCode}`,
				{
					method: 'POST',
					headers: {
						'x-authentication-token': 'borealis-fe-interview-token',
					},
				}
			);

			if (response.ok) {
				const discountData = await response.json();
				configStore.setDiscount(discountData);
				setDiscountCode('');
				setAlert('');
			} else {
				setAlert('Kupon ne vrijedi');
			}
		} catch (error) {
			console.error('Error validating promo code:', error);
		}
	}

	useEffect(() => {
		fetchManufacturers()
			.then((response) => setManufacturers(response))
			.catch((error) => console.log(error));

		fetchServices()
			.then((response) => setServices(response))
			.catch((error) => console.log(error));

		configStore.loadFromLocalStorage();
	}, []);

	useEffect(() => {
		calculatePrice(configStore.discount.discountPercentage);
	}, [configStore.services, configStore.discount]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!configStore.manufacturer.id) {
			setAlert('Odaberite proizvođača');
			return;
		}

		if (!configStore.services.length) {
			setAlert('Odaberite bar jedan servis');
			return;
		}

		setAlert('');

		navigate('/summary');
	}

	return (
		<>
			<div className='flex flex-col items-center'>
				<form onSubmit={handleSubmit} className='max-w-[600px] py-10 w-full'>
					<h1 className='text-4xl font-bold pb-4'>Konfigurator Servisa</h1>
					<div className='pb-4'>
						<h2 className='text-lg text-primary100 font-bold pb-2'>
							Odaberite proizvođača vašeg vozila
						</h2>
						<div className='grid grid-cols-3 gap-2 p-2'>
							{manufacturers.map((manufacturer: Manufacturer) => (
								<Radio
									key={manufacturer.id}
									value={manufacturer.name}
									isSelected={configStore.manufacturer?.id === manufacturer.id}
									onChange={() =>
										handleselectedManufacturer(manufacturer)
									}></Radio>
							))}
						</div>
					</div>
					<div className='pb-2'>
						<h2 className='text-lg text-primary100 font-bold pb-2'>
							Odaberite servise
						</h2>
						<div className='grid grid-cols-2 gap-2 p-2'>
							{services.map((service: Service) => (
								<Checkbox
									key={service.id}
									value={service.name}
									price={service.price}
									isSelected={configStore.services.some(
										(s) => s.id === service.id
									)}
									onChange={() => handleCheckboxChange(service)}
								/>
							))}
						</div>
					</div>
					<div className='bg-bg200 px-3 py-2 w-full flex justify-between items-center'>
						<div>
							<p className='text-lg'>
								Ukupno{' '}
								<span className='text-primary100 font-bold'>
									{configStore.totalPrice}€
								</span>
							</p>
						</div>
						<div>
							{inputVisible || configStore.discount.code ? (
								<div>
									<div className='flex'>
										<input
											type='text'
											className={`px-2 py-1 w-[155px] mr-2 rounded border border-base100/40 ${
												configStore.discount.code
													? 'bg-gray-100 text-gray-400 cursor-not-allowed'
													: ''
											}`}
											value={discountCode}
											placeholder='Unesi kod'
											onChange={handleDiscountCode}
											disabled={!!configStore.discount.code}
										/>
										<Button
											className='bg-primary100 p-1 hover:bg-primary200'
											onClick={() => checkCode(discountCode)}
											type='button'
										/>
									</div>
									{configStore.discount.code ? (
										<div className='mt-2 border border-base100 rounded-full w-fit px-2 bg-base600 flex'>
											<p className='text-sm text-base100'>
												{configStore.discount.code}
											</p>
											<img
												src={close}
												alt='close'
												className='cursor-pointer'
												onClick={() => configStore.setDiscount({} as Discount)}
											/>
										</div>
									) : (
										''
									)}
								</div>
							) : (
								<Button title='Imam kupon' onClick={handleSetInputVisible} />
							)}
						</div>
					</div>
					<FormComponent />
					<button
						className='flex justify-center items-center w-full bg-primary100 text-base600 py-1 hover:bg-primary200'
						type='submit'>
						Dalje
					</button>
				</form>
				{alert ? <Alert alertText={alert} /> : ''}
			</div>
		</>
	);
});

export default Configurator;
