import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

export const TRANSACTON_RECORD = 'transaction_record';

/**
 * 保存数据到本地
 * @param key 键名
 * @param value 值（对象或字符串）
 */
export async function setLocalStorage(key: string, value: any): Promise<void> {
	try {
		const dataToStore = typeof value === 'string' ? value : JSON.stringify(value);
		await AsyncStorage.setItem(key, dataToStore);
	} catch (error) {
		console.error('setLocalStorage 失败:', error);
		throw error;
	}
}

/**
 * 从本地获取数据
 * @param key 键名
 * @returns 解析后的值
 */
export async function getLocalStorage<T = any>(key: string): Promise<T | null> {
	try {
		const data = await AsyncStorage.getItem(key);
		if (data === null) return null;
		try {
			return JSON.parse(data);
		} catch {
			return data as T;
		}
	} catch (error) {
		console.error('getLocalStorage 失败:', error);
		throw error;
	}
}

/**
 * 删除本地指定键的数据
 * @param key 键名
 */
export async function removeLocalStorage(key: string): Promise<void> {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		console.error('removeLocalStorage 失败:', error);
		throw error;
	}
}

/**
 * 清空所有本地数据
 */
export async function clearLocalStorage(): Promise<void> {
	try {
		await AsyncStorage.clear();
	} catch (error) {
		console.error('clearLocalStorage 失败:', error);
		throw error;
	}
}

export const randomId = () => Math.random().toString(36).substring(2, 10);

export const formatDay = (day: string) => {
	if (dayjs().date() === dayjs(day).date()) {
		return '今天';
	}

	if (dayjs().date() - dayjs(day).date() === 1) {
		return '昨天';
	}
	return dayjs(day).format('YYYY-MM-DD');
};
