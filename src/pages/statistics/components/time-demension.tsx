import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip } from 'react-native-paper';
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
		<View style={styles.container}>
			{/* 月/年切换 */}
			<View style={styles.dimensionRow}>
				<Button
					mode={timeDimension === 'month' ? 'contained' : 'outlined'}
					onPress={() => setTimeDimension('month')}
					style={styles.dimensionButton}
					contentStyle={styles.buttonContent}
					labelStyle={styles.buttonLabel}
				>
					月
				</Button>
				<Button
					mode={timeDimension === 'year' ? 'contained' : 'outlined'}
					onPress={() => setTimeDimension('year')}
					style={styles.dimensionButton}
					contentStyle={styles.buttonContent}
					labelStyle={styles.buttonLabel}
				>
					年
				</Button>
			</View>

			{/* 具体月份/年份选择 */}
			{timeDimension === 'month' && monthList.length > 0 && (
				<View style={styles.timeContainer}>
					{monthList.length <= 3 ? (
						// 选项少时，使用紧凑的布局
						<View style={styles.timeRow}>
							{monthList.map(month => {
								const isSelected = month === selectedMonth;
								return (
									<Chip
										key={month}
										selected={isSelected}
										onPress={() => setSelectedMonth(month)}
										style={styles.chip}
										textStyle={styles.chipText}
									>
										{dayjs(month).format('MM月')}
									</Chip>
								);
							})}
						</View>
					) : (
						// 选项多时，使用可滚动的按钮
						<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
							<View style={styles.timeRow}>
								{monthList.map(month => {
									const isSelected = month === selectedMonth;
									return (
										<Chip
											key={month}
											selected={isSelected}
											onPress={() => setSelectedMonth(month)}
											style={styles.chip}
											textStyle={styles.chipText}
										>
											{dayjs(month).format('MM月')}
										</Chip>
									);
								})}
							</View>
						</ScrollView>
					)}
				</View>
			)}

			{timeDimension === 'year' && yearList.length > 0 && (
				<View style={styles.timeContainer}>
					{yearList.length <= 3 ? (
						// 选项少时，使用紧凑的布局
						<View style={styles.timeRow}>
							{yearList.map(year => {
								const isSelected = year.toString() === selectedYear;
								return (
									<Chip
										key={year}
										selected={isSelected}
										onPress={() => setSelectedYear(year.toString())}
										style={styles.chip}
										textStyle={styles.chipText}
									>
										{year}年
									</Chip>
								);
							})}
						</View>
					) : (
						// 选项多时，使用可滚动的按钮
						<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
							<View style={styles.timeRow}>
								{yearList.map(year => {
									const isSelected = year.toString() === selectedYear;
									return (
										<Chip
											key={year}
											selected={isSelected}
											onPress={() => setSelectedYear(year.toString())}
											style={styles.chip}
											textStyle={styles.chipText}
										>
											{year}年
										</Chip>
									);
								})}
							</View>
						</ScrollView>
					)}
				</View>
			)}
		</View>
	);
}

export default TimeDemension;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: '#fff',
		gap: 12,
	},
	dimensionRow: {
		flexDirection: 'row',
		gap: 8,
	},
	dimensionButton: {
		flex: 1,
		borderRadius: 20,
	},
	timeContainer: {
		minHeight: 40,
	},
	scrollRow: {
		flexGrow: 0,
	},
	timeRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	chip: {
		height: 36,
	},
	chipText: {
		fontSize: 13,
		lineHeight: 20,
	},
	buttonContent: {
		paddingVertical: 4,
		paddingHorizontal: 16,
	},
	buttonLabel: {
		fontSize: 14,
	},
});
