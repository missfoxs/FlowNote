import { Card, Icon, Text, TouchableRipple } from 'react-native-paper';
import { useCategoryStore, useTransactionStore } from '../../store';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryRecordDetail } from '../../type';
import TimeDemension from './components/time-demension';
import dayjs from 'dayjs';
import { useGlobalStore } from '../../store/global';
import { Router_Name } from '../../routes';
import { useNavigation } from '@react-navigation/native';

type CategoryTransactions = Record<string, CategoryRecordDetail>;

function Statistics() {
	const { transactions } = useTransactionStore();
	const { categories } = useCategoryStore();
	const [categoryTransactions, setCategoryTransactions] = useState<CategoryTransactions>();
	const [timeDimension, setTimeDimension] = useState<'month' | 'year'>('month');
	const [monthList, setMonthList] = useState<string[]>([]);
	const [yearList, setYearList] = useState<number[]>([]);
	const [selectedMonth, setSelectedMonth] = useState<string>();
	const [selectedYear, setSelectedYear] = useState<string>();

	const { setCurrentCategoryRecordDetail } = useGlobalStore();
	const { navigate } = useNavigation();

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
				map[record.category] = { ...vals, total: vals.total + record.amount, list: [...vals.list, record] };
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

	// 分类记录详情
	const handleDetail = useCallback(
		(categoryRecord: CategoryRecordDetail) => {
			setCurrentCategoryRecordDetail(categoryRecord);
			navigate(Router_Name.CategoryRecordDetail as never);
		},
		[setCurrentCategoryRecordDetail, navigate],
	);

	// 渲染分类记录
	const renderRecord = useMemo(() => {
		if (!categoryTransactions) return null;

		const sortedEntries = Object.entries(categoryTransactions).sort((a, b) => {
			return b[1].total - a[1].total;
		});

		if (sortedEntries.length === 0) {
			return (
				<View style={styles.emptyContainer}>
					<Text variant="bodyLarge" style={styles.emptyText}>
						暂无统计数据
					</Text>
				</View>
			);
		}

		return sortedEntries.map(([categoryName, record]) => (
			<TouchableRipple key={categoryName} onPress={() => handleDetail(record)}>
				<Card mode="elevated" style={styles.recordCard} contentStyle={styles.cardContent}>
					<View style={styles.recordItemWrapper}>
						<View style={styles.recordItemContent}>
							<Icon source={record.icon} size={24} />
							<Text variant="bodyLarge" style={styles.categoryName}>
								{categoryName}
							</Text>
						</View>
						<View style={styles.recordDetails}>
							<Text variant="bodyLarge" style={styles.amountText}>
								总金额: ¥{record.total.toFixed(2)}
							</Text>
						</View>
					</View>
				</Card>
			</TouchableRipple>
		));
	}, [categoryTransactions, handleDetail]);

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
			<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
				{renderRecord}
			</ScrollView>
		</View>
	);
}

export default Statistics;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		padding: 16,
		gap: 12,
		paddingBottom: 24,
	},
	recordCard: {
		marginBottom: 0,
	},
	cardContent: {
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	recordItemWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	recordItemContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		flex: 1,
	},
	categoryName: {
		fontSize: 15,
		fontWeight: '500',
	},
	recordDetails: {
		alignItems: 'flex-end',
		marginLeft: 12,
	},
	amountText: {
		fontSize: 15,
		fontWeight: '600',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 100,
	},
	emptyText: {
		opacity: 0.5,
	},
});
