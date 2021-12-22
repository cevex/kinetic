import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalVariables } from '../../styles';
import { UiItem } from './core/ui-item.model';

interface SelectSwitchProp {
    items: UiItem[];
    selectedItemId?: string;
    onSelected: ((item: UiItem) => void) | undefined;
}

class KntSelectSwitch extends Component<SelectSwitchProp> {
    render() {
        return (
            <View style={styles.switchContainer}>
                {this.props.items.map((item: UiItem) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.switchButton,
                            this.props.selectedItemId === item.id
                                ? styles.switchButtonSelected
                                : styles.switchButtonUnselected
                        ]}
                        onPress={() => {
                            this.props.onSelected && this.props.onSelected(item);
                        }}>
                        <Text style={styles.switchButtonText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',

        width: '100%',
        height: 44,

        backgroundColor: globalVariables.color.grey.light,
        borderRadius: 8
    },
    switchButton: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 1
    },
    switchButtonSelected: {
        backgroundColor: globalVariables.color.bg,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: globalVariables.color.grey.light,
        height: 42
    },
    switchButtonUnselected: {
        backgroundColor: globalVariables.color.grey.light
    },
    switchButtonText: {
        fontSize: globalVariables.fontSize.medium,
        textAlign: 'center'
    }
});

export default KntSelectSwitch;
