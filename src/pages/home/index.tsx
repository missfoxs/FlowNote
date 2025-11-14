import { FlatList, StyleSheet, View } from 'react-native';
import { useCategoryStore, useTransactionStore } from '../../store';
import TransactionRecord from './components/TransactionRecord';
import { Transaction } from '../../type';
import FabPlus from '../../components/FabPlus';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import Overview from './components/Overview';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

function Home() {
	const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'));

	const [refreshing, setRefreshing] = useState(false);

	const [dayRecords, setDayRecords] = useState<{ day: string; records: Transaction[]; exposeTotal: number }[]>([]);

	const { transactions, deleteTransaction } = useTransactionStore();

	const { categories } = useCategoryStore();

	const { navigate } = useNavigation();

	const handleDetail = () => {};

	// 上一个月
	const handleEndReached = () => {
		const _currentMonth = dayjs(currentMonth).subtract(1, 'month').format('YYYY-MM');
		setCurrentMonth(_currentMonth);
	};

	// 下拉刷新
	const handleRefresh = () => {
		setRefreshing(true);
		const month = dayjs().month() + 1;
		if (month > dayjs(currentMonth).month()) {
			const _currentMonth = dayjs(currentMonth).add(1, 'month').format('YYYY-MM');
			setCurrentMonth(_currentMonth);
		}
		setRefreshing(false);
	};

	useEffect(() => {
		// 获取当月数据
		const monthTransactions = transactions.filter(transaction => {
			return dayjs(transaction.date).format('YYYY-MM') === currentMonth;
		});

		// 转换为天为key, 记录为value的map
		const dayMap = monthTransactions.reduce((acc, cur) => {
			const day = dayjs(cur.date).format('YYYY-MM-DD');
			acc[day] = acc[day] || [];
			acc[day].push(cur);
			return acc;
		}, {} as Record<string, Transaction[]>);

		// 转换为数组
		const _dayRecords = Object.entries(dayMap).map(([day, records]) => ({
			day: dayjs(day).format('YYYY-MM-DD'),
			records,
			exposeTotal: records.reduce((acc, cur) => acc + (cur.mode === 'expense' ? cur.amount : 0), 0),
		}));

		console.log(_dayRecords);

		setDayRecords(_dayRecords);
	}, [currentMonth, transactions]);

	return (
		<View style={[styles.container]}>
			<Overview currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
			<FlatList
				data={dayRecords}
				keyExtractor={item => item.day.toString()}
				renderItem={({ item }) => (
					<TransactionRecord recordByDay={item} onDelete={deleteTransaction} onDetail={handleDetail} categories={categories} />
				)}
				onRefresh={handleRefresh}
				refreshing={refreshing}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.3}
				ListEmptyComponent={<Text>暂无交易记录</Text>}
			/>
			<FabPlus onPress={() => navigate('Category' as never)} />
		</View>
	);
}

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
