import { FlatList, StyleSheet, View } from "react-native";
import { useCategoryStore, useTransactionStore } from "../../store";
import TransactionRecord from "./components/TransactionRecord";
import { Transaction } from "../../type";
import FabPlus from "../../components/FabPlus";
import { useNavigation } from "@react-navigation/native";
import { Surface, Text } from "react-native-paper";

function Home() {
    const { transactions, deleteTransaction } = useTransactionStore();

    const { categories } = useCategoryStore();

    const { navigate } = useNavigation();

    const handleDetail = (record: Transaction) => {
        console.log(record);
    }

    return (
        <View style={[styles.container]}>
            {transactions.length > 0 ? <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <TransactionRecord record={item} onDelete={deleteTransaction} onDetail={handleDetail} categories={categories} />}
            /> : <Surface style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>暂无交易记录</Text>
            </Surface>}
            <FabPlus onPress={() => navigate('Category' as never)} />
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})