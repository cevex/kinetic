import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import KntCheckBox from '../../../ui/form/check-box/check-box.component';
import styles from './exercises-item.style';

interface ExerciseItemProp {
    exercise: Exercise;
    selected: boolean;
    showCheck?: boolean;
    onExerciseSelected?: (exercise: Exercise) => void;
    onExerciseNavigate?: (exercise: Exercise) => void;
}

class ExerciseItem extends Component<ExerciseItemProp> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    {this.props.showCheck && (
                        <View style={styles.box}>
                            <KntCheckBox
                                checked={this.props.selected}
                                onCheckChange={() =>
                                    this.props.onExerciseSelected(this.props.exercise)
                                }
                            />
                        </View>
                    )}
                    <Text
                        style={[styles.text, !this.props.showCheck && styles.textAlone]}
                        onPress={() => this.props.onExerciseNavigate(this.props.exercise)}>
                        {this.props.exercise.label}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.props.onExerciseNavigate(this.props.exercise)}>
                    <Image
                        style={styles.img}
                        source={require('../../../../assets/images/play-button.png')}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default ExerciseItem;
