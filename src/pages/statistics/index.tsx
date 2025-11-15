import { Surface, Text } from 'react-native-paper';
import { useTransactionStore } from '../../store';
import { StyleSheet, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { Transaction } from '../../type';

type CategoryTransactions = Record<
	string,
	{
		list: Transaction[];
		total: number;
	}
>;

function Statistics() {
	const { transactions } = useTransactionStore();
	const [categoryTransactions, setCategoryTransactions] = useState<CategoryTransactions>();

	useEffect(() => {
		// 按时间过滤数据
		const filteredRecord = transactions.filter(transaction => {
			return transaction;
		});

		// 过滤后的数据分类
		const map: CategoryTransactions = {};
		filteredRecord.forEach(record => {
			const vals = map[record.category];
			if (vals) {
				map[record.category] = { ...vals, total: vals.total + record.amount };
			} else {
				map[record.category] = {
					list: [record],
					total: record.amount,
				};
			}
		});

		// 排序...
		setCategoryTransactions(map);
	}, [transactions]);

	const renderRecord = useMemo(() => {
		if (!categoryTransactions) return null;

		return Object.entries(categoryTransactions).map(([key, record]) => (
			<View key={key}>
				<Text>{key}</Text>
				<Text>{record.total}</Text>
			</View>
		));
	}, [categoryTransactions]);

	return <Surface style={styles.container}>{renderRecord}</Surface>;
}

export default Statistics;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
