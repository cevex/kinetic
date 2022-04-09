import React, { Component } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalVariables } from '../../styles';
import styles from './check-box.style';

interface CheckBoxProp {
    checked: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    onCheckChange?: (checked: boolean) => void;
}

class KntCheckBox extends Component<CheckBoxProp, CheckBoxProp> {
    constructor(props: CheckBoxProp) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.imagesContainer}
                onPress={() =>
                    this.props.onCheckChange && this.props.onCheckChange(!this.props.checked)
                }>
                <Icon
                    name={this.props.checked ? 'check-circle' : 'circle'}
                    size={25}
                    color={
                        this.props.checked
                            ? globalVariables.color.primary
                            : globalVariables.color.grey.light
                    }
                />
            </TouchableOpacity>
        );
    }
}

export default KntCheckBox;
