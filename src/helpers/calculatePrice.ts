import configStore from '../stores/ConfigStore';

export default function calculatePrice(discount = 0) {
	const total = configStore.services.reduce(
		(total, service) => total + service.price,
		0
	);
	const withDiscount = discount ? total * (1 - discount / 100) : total;
	configStore.setTotalPrice(withDiscount);
	configStore.setRawPrice(total);
}
