import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Surface, Text } from 'react-native-paper';
import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
import { useState } from 'react';

function User() {
	const [selectedImage, setSelectedImage] = useState<string>('');

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

	return (
		<ScrollView>
			<Surface mode="flat" elevation={4} style={styles.userContainer}>
				<Avatar.Image size={40} source={selectedImage ? { uri: selectedImage } : require('../../assets/avatar.png')} />
				<Text>火星传奇</Text>
				<Button onPress={openCamera}>拍照</Button>
				<Button onPress={openGallery}>选择图片</Button>
			</Surface>
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
	},
});
