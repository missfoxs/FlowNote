import { Avatar, Icon, List, Surface, Text, TouchableRipple } from "react-native-paper";
import { Category, Transaction } from "../../../type";
import { StyleSheet, View } from "react-native";
import { formatDay } from "../../../utils";

interface TransactionRecordProps {
    recordByDay: { day: string; records: Transaction[]; exposeTotal: number };
    onDelete: (record: Transaction) => void;
    onDetail: (record: Transaction) => void;
    categories: Category[];
}

export default function TransactionRecord({ recordByDay, onDelete, onDetail, categories }: TransactionRecordProps) {
    const { day, records, exposeTotal } = recordByDay;

    return (
        <Surface style={styles.recordItem}>
            <List.Section>
                <List.Item
                    title={formatDay(day)}
                    right={() => <Text>共支出¥ {exposeTotal}</Text>}
                    disabled
                />
                {records.map(record => {
                    const category = categories.find((item) => item.id === record.category || item.name === record.category);

                    return <TouchableRipple onPress={() => onDetail(record)} rippleColor="rgba(0, 0, 0, .32)" key={record.id}>
                        <List.Item
                            title={record.category}
                            description={record.description}
                            left={() => category ? <Avatar.Icon icon={category.icon} size={35} style={{ backgroundColor: category.color }} /> : null}
                            containerStyle={styles.container}
                            right={() => <View style={styles.rightCom}>
                                <Text style={{ color: record.mode === 'expense' ? '#c62828' : '#2e7d32' }}>{record.mode === 'expense' ? '-' : '+'}{record.amount}</Text>
                                <TouchableRipple onPress={() => onDelete(record)}>
                                    <Icon source={'delete'} size={20} color={'#c62828'} />
                                </TouchableRipple>
                            </View>}
                        />
                    </TouchableRipple>
                })}
            </List.Section>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
    },
    recordItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    rightCom: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subHeader: {
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})