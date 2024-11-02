export interface Manufacturer {
	id: string;
	name: string;
}

export interface Service {
	id: string;
	name: string;
	price: number;
}

export interface Discount {
	code: string;
	discountPercentage: number;
	id: string;
}

export interface Form {
	name: string;
	phone: string;
	email: string;
	message?: string;
}

export interface messageBody {
	manufacturerId: string;
	serviceIds: Array[string];
	promoCode: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	note: string;
}

export interface FormErrors {
	name?: string;
	email?: string;
	phone?: string;
}

interface TitleProps {
	title: string;
}

interface AlertProps {
	alertText: string;
	className?: string;
}
