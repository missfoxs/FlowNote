import { create } from 'zustand';
import { CategoryRecordDetail } from '../type';

interface GlobalStore {
	currentCategoryRecordDetail: CategoryRecordDetail | null;
	setCurrentCategoryRecordDetail: (categoryRecordDetail: CategoryRecordDetail) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
	currentCategoryRecordDetail: null,
	setCurrentCategoryRecordDetail: (categoryRecordDetail) => set({ currentCategoryRecordDetail: categoryRecordDetail }),
}));