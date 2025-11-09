import { create } from "zustand";
import { Transaction, Category } from "../type";
import dayjs from "dayjs";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

const useTransactionStore = create<TransactionStore>()(
    // @ts-ignore
    persist(
        (set, get) => ({
            transactions: [],
            addTransaction: (transaction: Partial<Transaction>) => {
                const newTransaction = {
                    amount: transaction.amount ?? 0,
                    mode: transaction.mode ?? 'expense',
                    date: transaction.date ?? dayjs(),
                    remark: transaction.remark ?? '',
                    id: get().transactions.length + 1,
                    categoryId: transaction.categoryId ?? defaultCategoryList[0].id,
                }
                set(state => ({
                    transactions: [...state.transactions, newTransaction]
                }))
            },
            deleteTransaction: (record: Transaction) => set(state => ({
                transactions: state.transactions.filter((item) => item.id !== record.id),
            })),
        }),
        {
            name: 'transaction-storage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    )
)

export { useTransactionStore };
