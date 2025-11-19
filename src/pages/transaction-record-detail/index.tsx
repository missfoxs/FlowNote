import { ScrollView } from 'react-native';
import { TransactionRecordCard } from '../home/components/TransactionRecord';
import { useGlobalStore } from '../../store/global';
import { Surface } from 'react-native-paper';

function TransactionRecordDetail() {
	const { currentCategoryRecordDetail } = useGlobalStore();

	return (
		<ScrollView>
			{currentCategoryRecordDetail &&
				currentCategoryRecordDetail.list.map(record => {
					return (
						<Surface key={record.id}>
							<TransactionRecordCard key={record.id} record={record} />
						</Surface>
					);
				})}
		</ScrollView>
	);
}

export default TransactionRecordDetail;
