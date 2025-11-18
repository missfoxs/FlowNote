import { StyleSheet } from 'react-native';
import { Button, SegmentedButtons, Surface } from 'react-native-paper';
import dayjs from 'dayjs';

interface TimeDemensionProps {
	timeDimension: 'month' | 'year';
	monthList: string[];
	yearList: number[];
	selectedMonth: string;
	selectedYear: string;
	setSelectedYear: (selectedYear: string) => void;
	setSelectedMonth: (selectedMonth: string) => void;
	setTimeDimension: (timeDimension: 'month' | 'year') => void;
}

function TimeDemension({
	timeDimension,
	monthList,
	selectedMonth,
	yearList,
	selectedYear,
	setSelectedYear,
	setSelectedMonth,
	setTimeDimension,
}: TimeDemensionProps) {
	return (
		<Surface style={styles.dimensionContainer}>
			<SegmentedButtons
				value={timeDimension}
				onValueChange={setTimeDimension}
				buttons={[
					{
						value: 'month',
						label: '月',
					},
					{
						value: 'year',
						label: '年',
					},
				]}
			/>
			{timeDimension === 'month' && (
				<>
					{monthList.length > 1 ? (
						<SegmentedButtons
							value={selectedMonth}
							onValueChange={(month: string) => setSelectedMonth(month)}
							buttons={monthList.map(month => ({
								value: month,
								label: dayjs(month).format('MM'),
							}))}
						/>
					) : (
						<Button mode="outlined">{monthList[0]}</Button>
					)}
				</>
			)}
			{timeDimension === 'year' && (
				<>
					{yearList.length > 1 ? (
						<SegmentedButtons
							value={selectedYear.toString()}
							onValueChange={(year: string) => setSelectedYear(year)}
							buttons={yearList.map(year => ({
								value: year.toString(),
								label: year.toString(),
							}))}
						/>
					) : (
						<Button mode="outlined">{yearList[0]}</Button>
					)}
				</>
			)}
		</Surface>
	);
}

export default TimeDemension;

const styles = StyleSheet.create({
	dimensionContainer: {
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingVertical: 8,
		gap: 12,
	},
});
