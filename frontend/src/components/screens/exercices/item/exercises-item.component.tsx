import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import KntCheckBox from '../../../ui/check-box/check-box.component';
import styles from './exercises-item.style';

interface ExerciseItemProp {
    exercise: Exercise;
    selected: boolean;
    showCheck?: boolean;
}

class ExerciseItem extends Component<ExerciseItemProp> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    {this.props.showCheck && (
                        <View style={styles.box}>
                            <KntCheckBox checked={this.props.selected} />
                        </View>
                    )}
                    <Text style={[styles.text, !this.props.showCheck && styles.textAlone]}>
                        {this.props.exercise.label}
                    </Text>
                </View>
                <Image
                    style={styles.img}
                    source={require('../../../../assets/images/play-button.png')}
                />
            </View>
        );
    }
}

export default ExerciseItem;
