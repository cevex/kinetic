import React, { Component } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { UiItem } from '../../core/ui-item.model';
import { SelectProp } from '../select-prop.model';
import { SelectProgressService, SelectProgressStatus } from './select-progress.service';
import styles from './select-progress.style';

export interface SelectProgressProp extends SelectProp {
    items: SelectProgressItem[];
    selectedItemId?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    onSelected?: ((item: UiItem) => void) | undefined;
}

export interface SelectProgressItem extends UiItem {
    id: string;
    label: string;
    status: SelectProgressStatus;
    data?: any;
}

class KntSelectProgress extends Component<SelectProgressProp> {
    constructor(props: SelectProgressProp) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.items.map((item: SelectProgressItem) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.selectButton,
                            {
                                backgroundColor: SelectProgressService.getButtonStyle(item.status)
                                    .backgroundColor,
                                borderColor: SelectProgressService.getButtonStyle(item.status)
                                    .borderColor
                            },
                            this.props.selectedItemId === item.id
                                ? styles.selectButtonSelected
                                : styles.selectButtonUnselected
                        ]}
                        disabled={this.props.disabled}
                        onPress={() => {
                            this.props.onSelected && this.props.onSelected(item);
                        }}>
                        <Text
                            style={[
                                styles.selectButtonText,
                                {
                                    color: SelectProgressService.getButtonStyle(item.status)
                                        .textColor
                                },
                                this.props.selectedItemId === item.id
                                    ? styles.selectButtonTextSelected
                                    : styles.selectButtonText
                            ]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}

export default KntSelectProgress;
