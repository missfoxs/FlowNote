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
    // addTransaction: (transaction: Transaction) => void;
    deleteTransaction: (record: Transaction) => void;
    // updateTransaction: (id: number, transaction: Transaction) => void;
}

const useTransactionStore = create<TransactionStore>((set) => ({
    transactions: [
        {
            id: 1,
            categoryId: '1',
            amount: 100,
            mode: 'expense',
            date: dayjs(),
            remark: '购买了一个餐厅',
        },
        {
            id: 2,
            categoryId: '2',
            amount: 50,
            mode: 'expense',
            date: dayjs(),
            remark: '购买了一个衬衫',
        },
        {
            id: 3,
            categoryId: '3',
            amount: 200,
            mode: 'expense',
            date: dayjs(),
            remark: '购买了一个房子',
        },
        {
            id: 4,
            categoryId: '4',
            amount: 100,
            mode: 'expense',
            date: dayjs(),
            remark: '购买了一个出租车',
        },
    ],
    deleteTransaction: (record) => set((state) => ({
        transactions: state.transactions.filter((item) => item.id !== record.id),
    })),
}))

export { useTransactionStore };