import React, { Component } from 'react';
import { GestureResponderEvent, StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { ButtonState, ButtonType } from './button.model';
import { ButtonService } from './button.service';
import buttonStyles from './button.style';

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

export default KntButton;
