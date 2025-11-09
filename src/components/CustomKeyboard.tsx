import { StyleSheet, View, Text } from "react-native";
import { Drawer, Button, Surface, TextInput } from "react-native-paper";
import { useState } from "react";

interface CustomKeyboardProps {
    onClose?: (payload: { amount: number; description: string }) => void;
}

const formatDisplayValue = (value: string) => {
    return Number(value).toFixed(2);
}

function CustomKeyboard({ onClose }: CustomKeyboardProps) {
    const [displayValue, setDisplayValue] = useState('0');
    const [description, setDescription] = useState('');

    const keyboardLayout = [
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3'],
        ['.', '0', '⌫'],
    ];

    const handlePress = (key: string) => {
        if (key === '⌫') {
            setDisplayValue('0');
        } else if (key === '.') {
            if (!displayValue.includes('.')) {
                setDisplayValue(displayValue + key);
            }
        } else {
            setDisplayValue(displayValue + key);
        }
    };

    const renderKeyboardRow = (row: string[], rowIndex: number) => (
        <View key={rowIndex} style={styles.keyboardRow}>
            {row.map((key) => (
                <Button
                    key={key}
                    mode="outlined"
                    onPress={() => handlePress(key)}
                    style={styles.keyboardButton}
                    labelStyle={styles.keyboardButtonText}
                >
                    {key}
                </Button>
            ))}
        </View>
    );

    return (
        <Drawer.Section style={styles.keyboard}>
            <Surface style={styles.displayContainer}>
                <Text style={styles.displayText}>¥ {formatDisplayValue(displayValue)}</Text>
            </Surface>

            {/* 备注 */}
            <TextInput
                label="备注"
                mode="outlined"
                value={description}
                style={styles.textInput}
                onChangeText={text => setDescription(text)}
            />

            <Surface style={styles.keyboard}>
                {keyboardLayout.map(renderKeyboardRow)}
                <Button mode="outlined" onPress={() => onClose?.({ amount: Number(displayValue), description })}>确认</Button>
            </Surface>
        </Drawer.Section>
    );
}

export default CustomKeyboard;

const styles = StyleSheet.create({
    keyboard: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    displayContainer: {
        marginBottom: 12,
        paddingVertical: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    displayText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    textInput: {
        marginBottom: 12,
    },
    keyboardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        gap: 10,
    },
    keyboardButton: {
        flex: 1,
    },
    keyboardButtonText: {
        fontSize: 20,
    },
})
