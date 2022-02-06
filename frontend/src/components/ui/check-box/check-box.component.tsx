import React, { Component } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalVariables } from '../../styles';

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
            <TouchableOpacity style={styles.imagesContainer}>
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

const styles = StyleSheet.create({
    imagesContainer: {
        height: 45,
        width: 45
    }
});

export default KntCheckBox;
