import { makeAutoObservable } from 'mobx';
import { Manufacturer, Service, Discount, Form } from '../types/configurator';

class ConfigStore {
	manufacturer = {} as Manufacturer;
	services = [] as Service[];
	discount = {} as Discount;
	totalPrice = 0 as number;
	rawPrice = 10 as number;
	form = {} as Form;

	constructor() {
		makeAutoObservable(this);
		this.loadFromLocalStorage();
	}

	setManufacturer(manufaturer: Manufacturer) {
		this.manufacturer = manufaturer;
		this.saveToLocalStorage();
	}

	setServices(servicesList: Service[]) {
		this.services = servicesList;
		this.saveToLocalStorage();
	}

	setDiscount(discount: Discount) {
		this.discount = discount;
		this.saveToLocalStorage();
	}

	setTotalPrice(total: number) {
		this.totalPrice = total;
		this.saveToLocalStorage();
	}

	setRawPrice(total: number) {
		this.rawPrice = total;
		this.saveToLocalStorage();
	}

	setForm(formData: Form) {
		this.form = formData;
		this.saveToLocalStorage();
	}

	setFormField(field: keyof Form, value: string) {
		this.form = { ...this.form, [field]: value };
		this.saveToLocalStorage();
	}
	loadFromLocalStorage() {
		const data = localStorage.getItem('configStore');
		if (data) {
			const parsedData = JSON.parse(data);
			this.manufacturer = parsedData.manufacturer || {};
			this.services = parsedData.services || [];
			this.discount = parsedData.discount || {};
			this.totalPrice = parsedData.totalPrice || 0;
			this.form = parsedData.form || {};
		}
	}

	saveToLocalStorage() {
		localStorage.setItem(
			'configStore',
			JSON.stringify({
				manufacturer: this.manufacturer,
				services: this.services,
				discount: this.discount,
				total: this.totalPrice,
				form: this.form,
			})
		);
	}
}
const configStore = new ConfigStore();

export default configStore;
