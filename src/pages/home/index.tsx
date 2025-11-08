import { FlatList, StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Home() {
    const safeAreaInsets = useSafeAreaInsets();

    const list = [{
        id: 1,
        category: 'drink',
        amount: 100,
    }]
    return (
        <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
            <FlatList
                data={list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.category}
                        description={item.amount.toString()}
                        left={() => <List.Icon icon="folder" />}
                    />
                )}
            />
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
})