import { Avatar, Icon, List, Surface, Text, TouchableRipple } from "react-native-paper";
import { Category, Transaction } from "../../../type";
import { StyleSheet, View } from "react-native";

interface TransactionRecordProps {
    recordByDay: { day: string; records: Transaction[] };
    onDelete: (record: Transaction) => void;
    onDetail: (record: Transaction) => void;
    categories: Category[];
}

export default function TransactionRecord({ recordByDay, onDelete, onDetail, categories }: TransactionRecordProps) {
    const { day, records } = recordByDay;
    return (
        <Surface style={styles.recordItem}>
            <List.Section>
                <List.Subheader>{day}</List.Subheader>
                {records.map(record => {
                    const category = categories.find((item) => item.id === record.categoryId);
                    return <TouchableRipple onPress={() => onDetail(record)} rippleColor="rgba(0, 0, 0, .32)" key={record.id}>
                        <List.Item
                            title={record.amount}
                            description={record.remark}
                            left={() => category ? <Avatar.Icon icon={category.icon} size={30} style={{ backgroundColor: category.color }} /> : null}
                            containerStyle={styles.container}
                            right={() => <View style={styles.rightCom}>
                                <Text>{record.amount}</Text>
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
})