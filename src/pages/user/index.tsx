import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Avatar, Button, Card, Dialog, Surface, Text, TextInput } from 'react-native-paper';
import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
import { useState } from 'react';
import { useTransactionStore, useCategoryStore } from '../../store';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs';
import { pick } from '@react-native-documents/picker';

function User() {
	const [selectedImage, setSelectedImage] = useState<string>('');
	const [importDialogVisible, setImportDialogVisible] = useState(false);
	const [importData, setImportData] = useState('');
	const { transactions, addTransactionBatch } = useTransactionStore();
	const { categories } = useCategoryStore();

	const openCamera = () => {
		const options = {
			mediaType: 'photo' as MediaType,
			includeBase64: false,
			maxHeight: 2000,
			maxWidth: 2000,
		};

		launchCamera(options, response => {
			if (response.didCancel) {
				console.log('用户取消了拍照');
			} else if (response.errorCode) {
				console.log('相机错误: ', response.errorCode);
			} else {
				if (response?.assets?.[0]?.uri) {
					setSelectedImage(response?.assets?.[0]?.uri);
				}
			}
		});
	};

	// 打开相册
	const openGallery = () => {
		const options = {
			mediaType: 'photo' as MediaType,
			includeBase64: false,
			maxHeight: 2000,
			maxWidth: 2000,
			selectionLimit: 1, // 选择一张图片
		};

		launchImageLibrary(options, response => {
			if (response.didCancel) {
				console.log('用户取消了选择');
			} else if (response.errorCode) {
				console.log('相册错误: ', response.errorCode);
			} else {
				if (response?.assets?.[0]?.uri) {
					setSelectedImage(response?.assets?.[0]?.uri);
				}
			}
		});
	};

	// 导出数据
	const handleExport = async () => {
		try {
			const exportData = {
				transactions: transactions.map(t => ({
					...t,
					date: dayjs(t.date).toISOString(),
				})),
				categories: categories,
				exportDate: dayjs().toISOString(),
			};

			const jsonString = JSON.stringify(exportData, null, 2);

			const filePath = RNFS.DocumentDirectoryPath + `/export_data_${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.json`;

			await RNFS.writeFile(filePath, jsonString);

			Alert.alert('导出成功', `导出数据已保存到 ${filePath}`);
		} catch (error) {
			Alert.alert('导出失败', '导出数据时发生错误');
			console.error('Export error:', error);
		}
	};

	// 导入数据
	const handleImport = async () => {
		// setImportDialogVisible(true);
		try {
			const results = await pick({
				type: ['application/json', 'text/csv'],
				allowMultiSelection: false,
				mode: 'import',
			});

			if (results.length === 0) {
				return;
			}

			const file = results[0];
			const fileContent = await RNFS.readFile(file.uri, 'utf8');
			const data = JSON.parse(fileContent);

			console.log(data);

			// 如果数据格式正确，直接导入
			if (data.transactions && Array.isArray(data.transactions)) {
				const transactionsToImport = data.transactions.map((t: any) => ({
					...t,
					date: dayjs(t.date),
				}));
				addTransactionBatch(transactionsToImport);
				Alert.alert('导入成功', `成功导入 ${transactionsToImport.length} 条交易记录`);
			} else {
				Alert.alert('导入失败', '数据格式不正确');
			}
		} catch (error: any) {
			// 用户取消选择时，错误代码为 'DOCUMENT_PICKER_CANCELED'
			if (error?.code !== 'DOCUMENT_PICKER_CANCELED') {
				Alert.alert('导入失败', '导入数据时发生错误');
				console.error('Import error:', error);
			}
		}
	};

	// 确认导入
	const confirmImport = () => {
		try {
			const parsedData = JSON.parse(importData);

			if (parsedData.transactions && Array.isArray(parsedData.transactions)) {
				// 转换日期格式
				const transactionsToImport = parsedData.transactions.map((t: any) => ({
					...t,
					date: dayjs(t.date),
				}));

				// 批量添加交易记录
				addTransactionBatch(transactionsToImport);
				Alert.alert('导入成功', `成功导入 ${transactionsToImport.length} 条交易记录`);
				setImportData('');
				setImportDialogVisible(false);
			} else {
				Alert.alert('导入失败', '数据格式不正确');
			}
		} catch (error) {
			Alert.alert('导入失败', 'JSON 格式错误，请检查数据格式');
			console.error('Import error:', error);
		}
	};

	return (
		<ScrollView>
			<Surface mode="flat" elevation={4} style={styles.userContainer}>
				<Avatar.Image size={40} source={selectedImage ? { uri: selectedImage } : require('../../assets/avatar.png')} />
				<Text>火星传奇</Text>
				<Button onPress={openCamera}>拍照</Button>
				<Button onPress={openGallery}>选择图片</Button>
			</Surface>

			{/* 数据管理模块 */}
			<Card style={styles.dataCard} mode="outlined">
				<Card.Title title="数据管理" />
				<Card.Content>
					<Text variant="bodyMedium" style={styles.dataDescription}>
						导出或导入您的交易数据
					</Text>
				</Card.Content>
				<Card.Actions style={styles.cardActions}>
					<Button mode="contained" onPress={handleExport} icon="download">
						导出数据
					</Button>
					<Button mode="outlined" onPress={handleImport} icon="upload">
						导入数据
					</Button>
				</Card.Actions>
			</Card>

			{/* 导入对话框 */}
			<Dialog visible={importDialogVisible} onDismiss={() => setImportDialogVisible(false)}>
				<Dialog.Title>导入数据</Dialog.Title>
				<Dialog.Content>
					<Text variant="bodySmall" style={styles.dialogHint}>
						请粘贴 JSON 格式的数据
					</Text>
					<TextInput
						mode="outlined"
						multiline
						numberOfLines={10}
						value={importData}
						onChangeText={setImportData}
						placeholder="粘贴 JSON 数据..."
						style={styles.textInput}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => setImportDialogVisible(false)}>取消</Button>
					<Button mode="contained" onPress={confirmImport}>
						确认导入
					</Button>
				</Dialog.Actions>
			</Dialog>
		</ScrollView>
	);
}

export default User;

const styles = StyleSheet.create({
	userContainer: {
		padding: 16,
		borderRadius: 16,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 16,
		marginTop: 16,
	},
	dataCard: {
		marginHorizontal: 16,
		marginTop: 16,
		marginBottom: 16,
	},
	dataDescription: {
		marginBottom: 8,
	},
	cardActions: {
		justifyContent: 'space-around',
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	dialogHint: {
		marginBottom: 8,
		color: '#666',
	},
	textInput: {
		marginTop: 8,
		minHeight: 200,
	},
});
