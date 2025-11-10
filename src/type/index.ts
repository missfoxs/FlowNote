import { Dayjs } from "dayjs";

export type Category = {
    id: string;
    name: string;
    icon: string;
    color: string;
}

export type TransactionMode = 'income' | 'expense';

export type Transaction = {
    id: string;
    categoryId: Category['id'];
    amount: number;
    mode: TransactionMode;
    date: Dayjs;
    remark?: string;
}