import { useState, useEffect } from 'react';
import configStore from '../stores/ConfigStore';
import { Form } from '../types/configurator';

export default function Button() {
	const [name, setName] = useState('' as string);
	const [phone, setPhone] = useState('' as string);
	const [email, setEmail] = useState('' as string);
	const [message, setMessage] = useState('' as string);

	useEffect(() => {
		setName(configStore.form.name || '');
		setPhone(configStore.form.phone || '');
		setEmail(configStore.form.email || '');
		setMessage(configStore.form.message || '');
	}, []);

	const handleInput = (
		value: string,
		setter: React.Dispatch<React.SetStateAction<string>>,
		field: keyof Form
	) => {
		setter(value);
		configStore.setFormField(field, value);
	};

	return (
		<div className='pt-4 pb-2 w-full'>
			<h2 className='text-lg text-primary100 font-bold pb-2'>Vaši podaci</h2>
			<div className='flex gap-4 pb-4'>
				<div className='flex flex-col w-full'>
					<label htmlFor='name'>Ime i prezime</label>
					<input
						name='name'
						id='name'
						type='text'
						className='px-2 py-1 mr-2 rounded border border-base100/40 w-full'
						value={name}
						placeholder='Unesite ime i prezime'
						onChange={(e) => handleInput(e.target.value, setName, 'name')}
						required
					/>
				</div>
				<div className='flex flex-col w-full'>
					<label htmlFor='phone'>Broj telefona</label>
					<input
						name='phone'
						id='phone'
						type='tel'
						className='px-2 py-1 mr-2 rounded border border-base100/40 w-full'
						value={phone}
						placeholder='Unesite broj telefona'
						onChange={(e) => handleInput(e.target.value, setPhone, 'phone')}
						required
					/>
				</div>
			</div>
			<div className='flex flex-col w-full pb-4'>
				<label htmlFor='email'>Email adresa</label>
				<input
					name='email'
					id='email'
					type='email'
					className='px-2 py-1 mr-2 rounded border border-base100/40 w-full'
					value={email}
					placeholder='Unesite email adresu'
					onChange={(e) => handleInput(e.target.value, setEmail, 'email')}
					required
				/>
			</div>
			<div className='flex flex-col w-full pb-4'>
				<label htmlFor='message'>Napomena (opcionalno)</label>
				<textarea
					name='message'
					id='message'
					value={message}
					placeholder='Unesite napomenu'
					className='px-2 py-1 mr-2 rounded border border-base100/40 w-full'
					onChange={(e) => handleInput(e.target.value, setMessage, 'message')}
				/>
			</div>
		</div>
	);
}
