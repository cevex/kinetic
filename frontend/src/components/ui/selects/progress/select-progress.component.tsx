import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { UiItem } from '../../core/ui-item.model';
import { SelectProp } from '../select-prop.model';
import styles from './select-progress.style';

class KntSelectProgress extends Component<SelectProp> {
    render() {
        return (
            <View style={styles.switchContainer}>
                {this.props.items.map((item: UiItem) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.selectButton,
                            this.props.selectedItemId === item.id
                                ? styles.selectButtonSelected
                                : styles.selectButtonUnselected
                        ]}
                        disabled={this.props.disabled}
                        onPress={() => {
                            this.props.onSelected && this.props.onSelected(item);
                        }}>
                        <Text style={styles.selectButtonText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}

export default KntSelectProgress;
