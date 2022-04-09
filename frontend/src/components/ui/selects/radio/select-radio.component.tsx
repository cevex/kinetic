import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { globalStyles } from '../../../styles';
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
                    <View style={globalStyles.card}>
                        <KntCheckBox
                            checked={this.props.selectedItemId === item.id}
                            onCheckChange={() => this.props.onSelected(item)}
                        />
                        <Text style={globalStyles.cardMessage}>{item.label}</Text>
                    </View>
                ))}
            </View>
        );
    }
}

export default KntSelectRadio;
