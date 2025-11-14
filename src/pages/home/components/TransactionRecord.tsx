import { Avatar, Icon, List, Surface, Text, TouchableRipple } from 'react-native-paper';
import { Category, Transaction } from '../../../type';
import { StyleSheet, View } from 'react-native';
import { formatDay } from '../../../utils';

interface TransactionRecordProps {
	recordByDay: { day: string; records: Transaction[]; exposeTotal: number };
	onDelete: (record: Transaction) => void;
	onDetail: (record: Transaction) => void;
	categories: Category[];
}

export default function TransactionRecord({ recordByDay, onDelete, categories }: TransactionRecordProps) {
	const { day, records, exposeTotal } = recordByDay;

	return (
		<Surface style={styles.recordItem}>
			<List.Section>
				<List.Item title={formatDay(day)} right={() => <Text>共支出¥ {exposeTotal}</Text>} disabled />
				{records.map(record => {
					const category = categories.find(item => item.id === record.category || item.name === record.category);

					return (
						<List.Item
							title={record.category}
							description={record.description}
							key={record.id}
							left={() =>
								category ? (
									<Avatar.Icon
										icon={category.icon}
										size={35}
										style={{
											backgroundColor: category.color,
										}}
									/>
								) : null
							}
							containerStyle={styles.container}
							right={() => (
								<View style={styles.rightCom}>
									<Text
										style={{
											color: record.mode === 'expense' ? '#c62828' : '#2e7d32',
											backgroundColor: 'red'
										}}
									>
										{record.mode === 'expense' ? '-' : '+'}
										{record.amount}
									</Text>
									<TouchableRipple onPress={() => onDelete(record)}>
										<Icon source={'delete'} size={20} color={'#c62828'} />
									</TouchableRipple>
								</View>
							)}
						/>
					);
				})}
			</List.Section>
		</Surface>
	);
}

const styles = StyleSheet.create({
	recordItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	container: {
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	rightCom: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	subHeader: {
		gap: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
