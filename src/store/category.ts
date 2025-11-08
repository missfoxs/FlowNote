import { create } from "zustand";
import { Category } from "../type";

interface CategoryStore {
    categories: Category[];
}

const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [
        {
            id: '1',
            name: '餐饮',
            icon: 'emoticon',
            color: '#F44336',
        },
        {
            id: '2',
            name: '购物',
            icon: 'shopping-cart',
            color: '#4CAF50',
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
    ],
}));

export { useCategoryStore };