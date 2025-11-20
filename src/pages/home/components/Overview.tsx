import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import dayjs from 'dayjs';

interface OverviewProps {
	currentMonth: string;
	monthExposeTotal: number;
}

function Overview({ currentMonth, monthExposeTotal }: OverviewProps) {
	const formattedMonth = dayjs(currentMonth).format('YYYY年MM月');

	return (
		<Card mode="elevated" style={styles.overviewCard} contentStyle={styles.cardContent}>
			<View style={styles.overviewContainer}>
				<View style={styles.monthContainer}>
					<Text variant="titleMedium" style={styles.monthText}>
						{formattedMonth}
					</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text variant="bodySmall" style={styles.amountLabel}>
						本月支出
					</Text>
					<Text variant="headlineMedium" style={styles.amountText}>
						¥{monthExposeTotal.toFixed(2)}
					</Text>
				</View>
			</View>
		</Card>
	);
}

export default Overview;

const styles = StyleSheet.create({
	overviewCard: {
		marginHorizontal: 16,
		marginTop: 16,
		marginBottom: 8,
	},
	cardContent: {
		padding: 20,
	},
	overviewContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	monthContainer: {
		flex: 1,
	},
	monthText: {
		fontSize: 16,
		opacity: 0.7,
	},
	amountContainer: {
		alignItems: 'flex-end',
	},
	amountText: {
		fontSize: 32,
		fontWeight: 'bold',
		lineHeight: 40,
	},
	amountLabel: {
		marginTop: 4,
		opacity: 0.6,
	},
});
