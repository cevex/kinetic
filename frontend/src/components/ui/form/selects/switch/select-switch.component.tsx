import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { UiItem } from '../../../core/ui-item.model';
import { SelectProp } from '../select-prop.model';
import styles from './select-switch.style';

class KntSelectSwitch extends Component<SelectProp> {
    render() {
        return (
            <View style={[styles.switchContainer, this.props.style]}>
                {this.props.items.map((item: UiItem) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.switchButton,
                            this.props.selectedItemId === item.id
                                ? styles.switchButtonSelected
                                : styles.switchButtonUnselected
                        ]}
                        disabled={this.props.disabled}
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

export default KntSelectSwitch;
