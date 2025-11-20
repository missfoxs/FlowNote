import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { TransactionRecordCard } from '../home/components/TransactionRecord';
import { useGlobalStore } from '../../store/global';
import { useCategoryStore } from '../../store';
import { useMemo } from 'react';

function TransactionRecordDetail() {
	const { currentCategoryRecordDetail } = useGlobalStore();
	const { categories } = useCategoryStore();

	// 根据分类名称查找对应的分类信息
	const categoryMap = useMemo(() => {
		const map = new Map();
		categories.forEach(cat => {
			map.set(cat.name, cat);
			map.set(cat.id, cat);
		});
		return map;
	}, [categories]);

	if (!currentCategoryRecordDetail || currentCategoryRecordDetail.list.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text variant="bodyLarge" style={styles.emptyText}>
					暂无交易记录
				</Text>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
			{/* 分类信息头部 */}
			<Card mode="elevated" style={styles.headerCard} contentStyle={styles.headerContent}>
				<View style={styles.headerInfo}>
					<Text variant="titleLarge" style={styles.categoryTitle}>
						{currentCategoryRecordDetail.list[0]?.category || '未分类'}
					</Text>
					<Text variant="bodyMedium" style={styles.totalAmount}>
						总金额: ¥{currentCategoryRecordDetail.total.toFixed(2)}
					</Text>
				</View>
			</Card>

			{/* 交易记录列表 */}
			{currentCategoryRecordDetail.list.map((record, index) => {
				const category = categoryMap.get(record.category);
				return (
					<View key={record.id}>
						<Card mode="elevated" style={styles.recordCard} contentStyle={styles.cardContent}>
							<TransactionRecordCard record={record} category={category} />
						</Card>
						{index < currentCategoryRecordDetail.list.length - 1 && <View style={styles.divider} />}
					</View>
				);
			})}
		</ScrollView>
	);
}

export default TransactionRecordDetail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	contentContainer: {
		padding: 16,
		paddingBottom: 24,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	emptyText: {
		opacity: 0.5,
	},
	headerCard: {
		marginBottom: 16,
	},
	headerContent: {
		padding: 16,
	},
	headerInfo: {
		gap: 8,
	},
	categoryTitle: {
		fontSize: 20,
		fontWeight: '600',
	},
	totalAmount: {
		fontSize: 16,
		opacity: 0.7,
	},
	recordCard: {
		marginBottom: 0,
	},
	cardContent: {
		padding: 0,
	},
	divider: {
		height: 12,
	},
});
