import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCategoryStore, useTransactionStore } from "../../store";
import TransactionRecord from "./components/TransactionRecord";
import { Transaction } from "../../type";

function Home() {
    const safeAreaInsets = useSafeAreaInsets();

    const { transactions, deleteTransaction } = useTransactionStore();

    const { categories } = useCategoryStore();

    const handleDetail = (record: Transaction) => {
        console.log(record);
    }

    return (
        <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <TransactionRecord record={item} onDelete={deleteTransaction} onDetail={handleDetail} categories={categories} />}
            />
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})