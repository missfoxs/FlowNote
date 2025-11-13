import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

interface FabPlusProps {
	onPress?: () => void;
}

function FabPlus(props: FabPlusProps) {
	return <FAB icon="plus" style={styles.fab} onPress={props.onPress} />;
}

export default FabPlus;

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 20,
		bottom: 60,
	},
});
