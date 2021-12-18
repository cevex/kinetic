import React, { Component } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { globalVariables } from '../../styles';

export declare type ButtonType = 'primary' | 'secondary' | 'accentuate';

interface ButtonProp {
    label: string;
    type?: ButtonType;
    onPress: ((event?: GestureResponderEvent) => void) | undefined;
}

interface ButtonState {
    textColor: string;
    backgroundColor: string;
    borderColor?: string;
}

export class KntButton extends Component<ButtonProp, ButtonState> {
    constructor(props: ButtonProp) {
        super(props);
        this.state = this.initState();
    }

    private initState(): ButtonState {
        switch (this.props?.type) {
            case 'secondary':
                return {
                    backgroundColor: globalVariables.color.bg,
                    textColor: globalVariables.color.primary,
                    borderColor: globalVariables.color.primary
                };
            case 'accentuate':
                return {
                    backgroundColor: globalVariables.color.accent,
                    textColor: globalVariables.color.primary,
                    borderColor: globalVariables.color.primary
                };
            case 'primary':
            default:
                return {
                    backgroundColor: globalVariables.color.primary,
                    textColor: globalVariables.color.bg,
                    borderColor: globalVariables.color.primary
                };
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    ...styles.buttonContainer,
                    ...{ backgroundColor: this.state.backgroundColor },
                    ...{ borderColor: this.state.borderColor }
                }}
                onPress={this.props.onPress}>
                <Text
                    style={{
                        ...styles.buttonText,
                        ...{ color: this.state.textColor }
                    }}>
                    {this.props.label}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        margin: 10,

        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    },
    buttonText: {
        fontSize: globalVariables.fontSize.medium
    }
});

export default KntButton;
