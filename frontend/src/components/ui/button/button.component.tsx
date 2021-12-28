import React, { Component } from 'react';
import {
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import { globalVariables } from '../../styles';
import { ButtonState, ButtonType } from './button.model';
import { ButtonService } from './button.service';

interface ButtonProp {
    label: string;
    type?: ButtonType;
    fitWith?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    onPress?: (event?: GestureResponderEvent) => void;
}

class KntButton extends Component<ButtonProp, ButtonState> {
    constructor(props: ButtonProp) {
        super(props);
        this.state = ButtonService.initState(this.props?.type);
    }

    render() {
        return (
            <TouchableOpacity
                style={[
                    this.props.style, // Allow parent to custom component
                    buttonStyles.container,
                    {
                        backgroundColor: this.state.backgroundColor,
                        borderColor: this.state.borderColor
                    },
                    this.props.fitWith && buttonStyles.fullWidth,
                    this.props.disabled && buttonStyles.disabled
                ]}
                disabled={this.props.disabled}
                onPress={this.props.onPress}>
                <Text
                    style={{
                        ...buttonStyles.text,
                        ...{ color: this.state.textColor }
                    }}>
                    {this.props.label}
                </Text>
            </TouchableOpacity>
        );
    }
}

const buttonStyles = StyleSheet.create({
    container: {
        height: 45,
        alignItems: 'center',
        margin: 5,

        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    },
    text: {
        fontSize: globalVariables.fontSize.medium
    },
    disabled: {
        opacity: 0.5
    },
    fullWidth: {
        width: '100%'
    }
});

export default KntButton;
