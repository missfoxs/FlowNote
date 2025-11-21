import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card, Button, TextInput, IconButton } from 'react-native-paper';
import { useState } from 'react';

interface CustomKeyboardProps {
	onClose?: (payload: { amount: number; description: string }) => void;
	onCancel?: () => void;
}

const formatDisplayValue = (value: string) => {
	const num = Number(value);
	if (isNaN(num)) return '0.00';
	return num.toFixed(2);
};

function CustomKeyboard({ onClose, onCancel }: CustomKeyboardProps) {
	const [displayValue, setDisplayValue] = useState('0');
	const [description, setDescription] = useState('');

	const keyboardLayout = [
		['7', '8', '9'],
		['4', '5', '6'],
		['1', '2', '3'],
		['.', '0', 'backspace'],
	];

	const handlePress = (key: string) => {
		if (key === 'backspace') {
			// 逐位删除
			if (displayValue.length > 1) {
				setDisplayValue(displayValue.slice(0, -1));
			} else {
				setDisplayValue('0');
			}
		} else if (key === '.') {
			// 小数点处理
			if (!displayValue.includes('.')) {
				setDisplayValue(displayValue + key);
			}
		} else {
			// 数字输入：如果当前是0，则替换；否则追加
			if (displayValue === '0') {
				setDisplayValue(key);
			} else {
				// 检查小数点后是否超过2位
				const parts = displayValue.split('.');
				if (parts.length === 2 && parts[1].length >= 2) {
					return; // 最多两位小数
				}
				setDisplayValue(displayValue + key);
			}
		}
	};

	const handleReset = () => {
		setDisplayValue('0');
		setDescription('');
	};

	const handleConfirm = () => {
		const amount = Number(displayValue);
		if (amount > 0) {
			onClose?.({ amount, description });
			// 重置状态
			setDisplayValue('0');
			setDescription('');
		}
	};

	const renderKeyboardButton = (key: string) => {
		if (key === 'backspace') {
			return (
				<TouchableOpacity
					key={key}
					style={styles.keyboardButton}
					onPress={() => handlePress(key)}
					onLongPress={handleReset}
					activeOpacity={0.7}
				>
					<IconButton icon="backspace-outline" size={24} iconColor="#666" style={styles.iconButton} />
				</TouchableOpacity>
			);
		}

		return (
			<TouchableOpacity
				key={key}
				style={[styles.keyboardButton, key === '.' && styles.decimalButton]}
				onPress={() => handlePress(key)}
				activeOpacity={0.7}
			>
				<Text style={styles.keyboardButtonText}>{key}</Text>
			</TouchableOpacity>
		);
	};

	const renderKeyboardRow = (row: string[], rowIndex: number) => (
		<View key={rowIndex} style={styles.keyboardRow}>
			{row.map(renderKeyboardButton)}
		</View>
	);

	return (
		<Card mode="elevated" style={styles.container} contentStyle={styles.cardContent}>
			{/* 金额显示 */}
			<Card mode="outlined" style={styles.displayCard} contentStyle={styles.displayContent}>
				<Text style={styles.displayText}>¥ {formatDisplayValue(displayValue)}</Text>
			</Card>

			{/* 备注输入 */}
			<TextInput
				label="备注"
				mode="outlined"
				value={description}
				onChangeText={setDescription}
				style={styles.textInput}
				placeholder="添加备注（可选）"
			/>

			{/* 数字键盘 */}
			<View style={styles.keyboardContainer}>
				{keyboardLayout.map(renderKeyboardRow)}
			</View>

			{/* 操作按钮 */}
			<View style={styles.actionButtons}>
				{onCancel && (
					<Button mode="outlined" onPress={onCancel} style={styles.cancelButton}>
						取消
					</Button>
				)}
				<Button
					mode="contained"
					onPress={handleConfirm}
					style={styles.confirmButton}
					disabled={Number(displayValue) <= 0}
				>
					确认
				</Button>
			</View>
		</Card>
	);
}

export default CustomKeyboard;

const styles = StyleSheet.create({
	container: {
		marginBottom: 0,
	},
	cardContent: {
		padding: 16,
	},
	displayCard: {
		marginBottom: 16,
	},
	displayContent: {
		paddingVertical: 20,
		paddingHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	displayText: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#333',
		letterSpacing: 1,
	},
	textInput: {
		marginBottom: 16,
		backgroundColor: '#fff',
	},
	keyboardContainer: {
		marginBottom: 16,
	},
	keyboardRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12,
		gap: 12,
	},
	keyboardButton: {
		flex: 1,
		height: 56,
		backgroundColor: '#fff',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#e0e0e0',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 0,
	},
	decimalButton: {
		backgroundColor: '#f5f5f5',
	},
	keyboardButtonText: {
		fontSize: 24,
		fontWeight: '500',
		color: '#333',
	},
	iconButton: {
		margin: 0,
	},
	actionButtons: {
		flexDirection: 'row',
		gap: 12,
	},
	cancelButton: {
		flex: 1,
	},
	confirmButton: {
		flex: 1,
	},
});
