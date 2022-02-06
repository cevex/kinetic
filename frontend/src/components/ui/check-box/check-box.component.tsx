import React, { Component } from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

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
            <TouchableOpacity>
                <Image
                    style={styles.imagesContainer}
                    source={require('../../../assets/images/check-active.png')}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    imagesContainer: {
        height: 45,
        alignItems: 'center',
        margin: 5,

        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    }
});

export default KntCheckBox;
