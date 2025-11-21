import { StyleSheet, Text, View } from 'react-native';
import { useCategoryStore, useTransactionStore } from '../../store';
import { IconButton, Surface, Drawer } from 'react-native-paper';
import { Category } from '../../type';
import CustomKeyboard from '../../components/CustomKeyboard';
import { useRef, useState } from 'react';
import { Router_Name } from '../../routes';
import { useNavigation } from '@react-navigation/native';

function CategoryCom() {
	const currentCategory = useRef<Category | null>(null);

	const { categories } = useCategoryStore();

	const { addTransaction } = useTransactionStore();

	const [showKeyboard, setShowKeyboard] = useState(false);

	const { navigate } = useNavigation();

	const handlePress = (item: Category) => {
		currentCategory.current = item;

		setShowKeyboard(true);
	};

	const handleCloseKeyboard = (payload: { amount: number; description: string }) => {
		if (payload.amount <= 0) return;

		if (!currentCategory.current) return;

		setShowKeyboard(false);

		addTransaction({
			amount: payload.amount,
			category: currentCategory.current?.name || '',
			description: payload.description,
		});

		currentCategory.current = null;

		navigate(Router_Name.Home as never);
	};

	const handleCancelKeyboard = () => {
		setShowKeyboard(false);
		currentCategory.current = null;
	};

	return (
		<View style={styles.categoryContainer}>
			<Surface mode="flat" style={styles.surface}>
				{categories.map(item => (
					<View key={item.id} style={styles.categoryItem}>
						<IconButton
							icon={item.icon}
							size={35}
							containerColor={item.color}
							iconColor="white"
							mode="contained-tonal"
							onPress={() => handlePress(item)}
						/>
						<Text style={styles.categoryItemText}>{item.name}</Text>
					</View>
				))}
			</Surface>

			{/* 使用Drawer的底部抽屉效果 */}
			{showKeyboard && (
				<Drawer.Section style={styles.drawerContainer}>
					<CustomKeyboard onClose={handleCloseKeyboard} onCancel={handleCancelKeyboard} />
				</Drawer.Section>
			)}
		</View>
	);
}

export default CategoryCom;

const styles = StyleSheet.create({
	categoryContainer: {
		flex: 1,
	},
	surface: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	categoryItem: {
		width: '25%', // 占据1/4宽度
		aspectRatio: 1, // 保持正方形
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8,
	},
	categoryItemText: {
		fontSize: 14,
		marginTop: 4,
		textAlign: 'center',
	},
	drawerContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'white',
		elevation: 8,
	},
});
