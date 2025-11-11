import { create } from "zustand";
import { Transaction, Category, ImportTransaction } from "../type";
import dayjs from "dayjs";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomId } from "../utils";

interface TransactionStore {
    transactions: Transaction[];
    addTransaction: (transaction: Partial<Transaction>) => void;
    addTransactionBatch: (transactions: Partial<Transaction>[]) => void;
    deleteTransaction: (record: Transaction) => void;
    clearTransactions: () => void;
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
                    description: transaction.description ?? '',
                    id: randomId(),
                    category: transaction.category ?? '',
                }
                set(state => ({
                    transactions: [newTransaction, ...state.transactions]
                }))
            },
            deleteTransaction: (record: Transaction) => set(state => ({
                transactions: state.transactions.filter((item) => item.id !== record.id),
            })),
            addTransactionBatch: (transactions: ImportTransaction[]) => set(state => ({
                transactions: [...state.transactions, ...transactions.map((item) => ({
                    ...item,
                    id: randomId(),
                    category: item.category ?? '',
                    amount: item.amount ?? 0,
                    mode: item.mode ?? 'expense',
                    date: item.date ?? dayjs(),
                    description: item.description || '',
                }))],
            })),
            clearTransactions: () => set({ transactions: [] }),
        }),
        {
            name: 'transaction-storage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    )
)

export { useTransactionStore };
