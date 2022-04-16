import React, { Component, ReactNode } from 'react';
import { View } from 'react-native';
import { globalStyles } from '../../../styles';
import styles from './modal.style';

export interface ModalProp {
    children: ReactNode;
}

class KntModal extends Component<ModalProp> {
    render() {
        return (
            <View style={styles.modalContainer}>
                <View style={[styles.modal, globalStyles.card]}>{this.props.children}</View>
            </View>
        );
    }
}

export default KntModal;
