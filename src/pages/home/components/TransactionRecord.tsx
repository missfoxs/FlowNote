import { Avatar, Card, Divider, IconButton, List, Text } from 'react-native-paper';
import { Category, Transaction } from '../../../type';
import { StyleSheet, View } from 'react-native';
import { formatDay } from '../../../utils';

interface TransactionRecordProps {
	recordByDay: { day: string; records: Transaction[]; exposeTotal: number };
	onDelete: (record: Transaction) => void;
	onDetail: (record: Transaction) => void;
	categories: Category[];
}

export const TransactionRecordCard = ({
	record,
	category,
	onDelete,
}: {
	record: Transaction;
	category?: Category;
	onDelete?: (record: Transaction) => void;
}) => {
	const amountColor = record.mode === 'expense' ? '#c62828' : '#2e7d32';
	const amountPrefix = record.mode === 'expense' ? '-' : '+';

	return (
		<List.Item
			title={record.category || '未分类'}
			titleStyle={styles.transactionTitle}
			description={record.description || '无描述'}
			descriptionStyle={styles.transactionDescription}
			left={() =>
				category ? (
					<Avatar.Icon
						icon={category.icon}
						size={40}
						style={[
							styles.avatar,
							{
								backgroundColor: category.color,
							},
						]}
					/>
				) : (
					<Avatar.Icon icon="circle" size={40} style={styles.avatar} />
				)
			}
			right={() => (
				<View style={styles.rightContainer}>
					<Text variant="titleMedium" style={[styles.amountText, { color: amountColor }]}>
						{amountPrefix}¥{record.amount.toFixed(1)}
					</Text>
					{onDelete && (
						<IconButton
							icon="delete-outline"
							size={20}
							iconColor="#c62828"
							onPress={() => onDelete(record)}
							style={styles.deleteButton}
						/>
					)}
				</View>
			)}
			style={styles.listItem}
		/>
	);
};

export default function TransactionRecord({ recordByDay, onDelete, categories }: TransactionRecordProps) {
	const { day, records, exposeTotal } = recordByDay;

	return (
		<Card mode="elevated" style={styles.card} contentStyle={styles.cardContent}>
			<View style={styles.headerContainer}>
				<Text variant="titleMedium" style={styles.dateText}>
					{formatDay(day)}
				</Text>
				<Text variant="bodyMedium" style={styles.totalText}>
					共支出 ¥{exposeTotal.toFixed(2)}
				</Text>
			</View>
			<Divider style={styles.divider} />
			{records.map((record, index) => {
				const category = categories.find(item => item.id === record.category || item.name === record.category);

				return (
					<View key={record.id}>
						<TransactionRecordCard record={record} category={category} onDelete={onDelete} />
						{index < records.length - 1 && <Divider style={styles.itemDivider} />}
					</View>
				);
			})}
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: 16,
		marginBottom: 12,
	},
	cardContent: {
		padding: 0,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingTop: 12,
		paddingBottom: 8,
	},
	dateText: {
		fontSize: 16,
		fontWeight: '600',
	},
	totalText: {
		fontSize: 14,
		opacity: 0.7,
	},
	divider: {
		marginHorizontal: 16,
	},
	itemDivider: {
		marginLeft: 72,
	},
	listItem: {
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	avatar: {
		marginRight: 12,
	},
	transactionTitle: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 2,
	},
	transactionDescription: {
		fontSize: 13,
		opacity: 0.6,
	},
	rightContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	amountText: {
		fontSize: 16,
		fontWeight: '600',
	},
	deleteButton: {
		margin: 0,
	},
});
