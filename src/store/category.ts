import { create } from 'zustand';
import { Category } from '../type';
import { categories } from '../data/index.json';

interface CategoryStore {
	categories: Category[];
}

const useCategoryStore = create<CategoryStore>(() => ({
	categories,
}));

export { useCategoryStore };
