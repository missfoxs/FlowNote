import { Dayjs } from 'dayjs';

export type Category = {
	id: string;
	name: string;
	icon: string;
	color: string;
};

export type TransactionMode = 'income' | 'expense';

export type Transaction = {
	id: string;
	category: string;
	amount: number;
	mode: TransactionMode;
	date: Dayjs;
	description?: string;
};

export type ImportTransaction = Partial<
	Transaction & { category?: string; description?: string }
>;
