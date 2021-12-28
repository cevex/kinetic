import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalVariables } from '../../styles';
import { UiItem } from '../core/ui-item.model';
import { SelectProp } from './select-prop.model';

class KntSelectFlat extends Component<SelectProp> {
    render() {
        return (
            <View style={[this.props.style, selectFlatStyles.container]}>
                {this.props.items.map((item: UiItem) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[selectFlatStyles.item]}
                        disabled={this.props.disabled}
                        onPress={() => {
                            this.props.onSelected && this.props.onSelected(item);
                        }}>
                        <Text
                            style={[
                                selectFlatStyles.itemIcon,
                                this.props.selectedItemId === item.id &&
                                    selectFlatStyles.itemSelected
                            ]}>
                            {item.icon}
                        </Text>
                        <Text style={selectFlatStyles.itemText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}

const selectFlatStyles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    itemSelected: {
        backgroundColor: globalVariables.color.primary,
        borderRadius: 50
    },
    itemIcon: {
        fontSize: globalVariables.fontSize.xbig,
        padding: 10
    },
    itemText: {
        fontSize: globalVariables.fontSize.medium,
        marginTop: 10
    }
});

export default KntSelectFlat;
