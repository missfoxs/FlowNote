import { Icon, Surface, Text } from 'react-native-paper';
import { useCategoryStore, useTransactionStore } from '../../store';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { Transaction } from '../../type';
import TimeDemension from './components/time-demension';
import dayjs from 'dayjs';

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
	const [timeDimension, setTimeDimension] = useState<'month' | 'year'>('month');
	const [monthList, setMonthList] = useState<string[]>([]);
	const [yearList, setYearList] = useState<number[]>([]);
	const [selectedMonth, setSelectedMonth] = useState<string>();
	const [selectedYear, setSelectedYear] = useState<string>();

	useEffect(() => {
		// 按时间过滤数据
		let filteredRecord = transactions;

		if (timeDimension === 'month' && selectedMonth) {
			filteredRecord = filteredRecord.filter(record => dayjs(record.date).isSame(dayjs(selectedMonth), 'month'));
		} else if (timeDimension === 'year' && selectedYear) {
			filteredRecord = filteredRecord.filter(record => dayjs(record.date).year() === Number(selectedYear));
		}

		// 过滤后的数据分类
		const map: CategoryTransactions = {};
		filteredRecord.forEach(record => {
			const vals = map[record.category];
			if (vals) {
				map[record.category] = { ...vals, total: vals.total + record.amount };
			} else {
				const catagory = categories.find(item => item.name === record.category);

				map[record.category] = {
					list: [record],
					total: record.amount,
					icon: catagory?.icon || 'circle',
				};
			}
		});

		// 排序...
		setCategoryTransactions(map);
	}, [transactions, categories, timeDimension, selectedMonth, selectedYear]);

	useEffect(() => {
		if (transactions.length === 0) {
			setMonthList([]);
			setYearList([]);
			setSelectedMonth(dayjs().format('YYYY-MM'));
			setSelectedYear(dayjs().format('YYYY'));
			return;
		}

		const firstTransaction = transactions[transactions.length - 1];

		const currentYear = dayjs().year();

		const firstYear = dayjs(firstTransaction.date).year();

		const startMonth = dayjs(firstTransaction.date).startOf('month');
		const endMonth = dayjs().startOf('month');
		const _monthList: string[] = [];
		let cursor = startMonth;
		while (cursor.isBefore(endMonth) || cursor.isSame(endMonth)) {
			_monthList.push(cursor.format('YYYY-MM'));
			cursor = cursor.add(1, 'month');
		}

		const _yearList: number[] = [];
		for (let year = firstYear; year <= currentYear; year++) {
			_yearList.push(year);
		}

		setMonthList(_monthList);
		setYearList(_yearList);
		setSelectedMonth(dayjs().format('YYYY-MM'));
		setSelectedYear(dayjs().format('YYYY'));
	}, [transactions]);

	const renderRecord = useMemo(() => {
		if (!categoryTransactions) return null;

		return Object.entries(categoryTransactions)
			.sort((a, b) => {
				return b[1].total - a[1].total;
			})
			.map(([categoryName, record]) => (
				<Surface key={categoryName} style={styles.recordItem}>
					<View style={styles.recordItemContent}>
						<Icon source={record.icon} size={24} />
						<Text style={styles.categoryName}>{categoryName}</Text>
						{/* <ProgressBar progress={0.5} /> */}
					</View>
					<View style={styles.recordDetails}>
						<Text>总金额: ¥{record.total}</Text>
					</View>
				</Surface>
			));
	}, [categoryTransactions]);

	return (
		<View style={styles.container}>
			<TimeDemension
				setTimeDimension={setTimeDimension}
				timeDimension={timeDimension}
				monthList={monthList}
				selectedMonth={selectedMonth || ''}
				setSelectedMonth={setSelectedMonth}
				yearList={yearList}
				selectedYear={selectedYear || ''}
				setSelectedYear={setSelectedYear}
			/>
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
	recordItemContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
});
