import { create } from "zustand";
import { Transaction, Category } from "../type";
import dayjs from "dayjs";


const defaultCategoryList: Category[] = [
    {
        id: '1',
        name: '餐饮',
        icon: 'food',
        color: '#FF5722',
    },
    {
        id: '2',
        name: '服饰',
        icon: 'tshirt-crew',
        color: '#E91E63',
    },
    {
        id: '3',
        name: '住房',
        icon: 'home',
        color: '#9C27B0',
    },
    {
        id: '4',
        name: '交通',
        icon: 'car',
        color: '#607D8B',
    },

];

interface TransactionStore {
    transactions: Transaction[];
    addTransaction: (transaction: Partial<Transaction>) => void;
    deleteTransaction: (record: Transaction) => void;
    // updateTransaction: (id: number, transaction: Transaction) => void;
}

const useTransactionStore = create<TransactionStore>((set) => ({
    transactions: [],
    addTransaction: (transaction: Partial<Transaction>) => set((state) => ({
        transactions: [...state.transactions, {
            amount: transaction.amount ?? 0,
            mode: transaction.mode ?? 'expense',
            date: transaction.date ?? dayjs(),
            remark: transaction.remark ?? '',
            id: state.transactions.length + 1,
            categoryId: transaction.categoryId ?? defaultCategoryList[0].id,
        }],
    })),
    deleteTransaction: (record: Transaction) => set((state) => ({
        transactions: state.transactions.filter((item) => item.id !== record.id),
    })),
}))

export { useTransactionStore };