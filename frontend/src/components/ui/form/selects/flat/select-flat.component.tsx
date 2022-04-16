import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { UiItem } from '../../../core/ui-item.model';
import { SelectProp } from '../select-prop.model';
import styles from './select-flat.style';

class KntSelectFlat extends Component<SelectProp> {
    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                {this.props.items.map((item: UiItem) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.item]}
                        disabled={this.props.disabled}
                        onPress={() => {
                            this.props.onSelected && this.props.onSelected(item);
                        }}>
                        <Text
                            style={[
                                styles.itemIcon,
                                this.props.selectedItemId === item.id && styles.itemSelected
                            ]}>
                            {item.icon}
                        </Text>
                        <Text style={styles.itemText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}

export default KntSelectFlat;
