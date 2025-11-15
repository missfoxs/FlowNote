import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Surface, Text } from 'react-native-paper';
import { useTransactionStore } from '../../../store';
import { Transaction } from '../../../type';

interface OverviewProps {
	currentMonth: string;
}

function Overview({ currentMonth }: OverviewProps) {
	const { addTransactionBatch, clearTransactions } = useTransactionStore();

	const handleImport = async () => {
		const data = await import('../../../data/account_data_2025-11-10.json');
		addTransactionBatch(data.default.transactions as unknown as Transaction[]);
	};

	return (
		<Surface style={styles.overview}>
			<View>
				<Text>{currentMonth}</Text>
			</View>
			<Button onPress={() => clearTransactions()}>Clear</Button>
			<View>
				<IconButton icon={'import'} onPress={handleImport} />
			</View>
		</Surface>
	);
}

export default Overview;

const styles = StyleSheet.create({
	overview: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingVertical: 24,
		marginBottom: 24,
	},
});
