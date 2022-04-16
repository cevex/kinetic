import React, { Component } from 'react';
import { Text, View } from 'react-native';
import KntCheckBox from '../../check-box/check-box.component';
import { SelectProp } from '../select-prop.model';
import styles from './select-radio.style';

class KntSelectRadio extends Component<SelectProp> {
    constructor(props: SelectProp) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.items.map(item => (
                    <View key={item.id} style={styles.item}>
                        <KntCheckBox
                            checked={this.props.selectedItemId === item.id}
                            onCheckChange={() => this.props.onSelected(item)}
                        />
                        <Text style={styles.itemText}>{item.label}</Text>
                    </View>
                ))}
            </View>
        );
    }
}

export default KntSelectRadio;
