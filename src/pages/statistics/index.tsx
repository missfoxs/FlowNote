import { Icon, Surface, Text } from 'react-native-paper';
import { useCategoryStore, useTransactionStore } from '../../store';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { Transaction } from '../../type';

type CategoryTransactions = Record<
	string,
	{
		list: Transaction[];
		total: number;
		icon: string;
	}
>;

function Statistics() {
	const { transactions } = useTransactionStore();
	const { categories } = useCategoryStore();
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
				const catagory = categories.find(item => (item.name === record.category));

				map[record.category] = {
					list: [record],
					total: record.amount,
					icon: catagory?.icon || 'circle',
				};
			}
		});

		// 排序...
		setCategoryTransactions(map);
	}, [transactions, categories]);

	const renderRecord = useMemo(() => {
		if (!categoryTransactions) return null;

		return Object.entries(categoryTransactions).map(([categoryName, record]) => (
			<Surface key={categoryName} style={styles.recordItem}>
				<Icon source={record.icon} size={24} />
				<Text style={styles.categoryName}>{categoryName}</Text>
				<View style={styles.recordDetails}>
					<Text>总金额: ¥{record.total}</Text>
					{/* <Text>交易笔数: {record.count}</Text> */}
				</View>
			</Surface>
		));
	}, [categoryTransactions]);

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.record}>{renderRecord}</View>
			</ScrollView>
		</View>
	);
}

export default Statistics;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	record: {
		gap: 12,
		margin: 12,
	},
	recordItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 12,
		borderRadius: 8,
	},
	categoryName: {
		fontSize: 14,
	},
	recordDetails: {
		alignItems: 'flex-end',
	},
});
