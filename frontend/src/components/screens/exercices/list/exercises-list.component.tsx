import React, { Component } from 'react';
import { View } from 'react-native';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import ExerciseItem from '../item/exercises-item.component';
import styles from './exercises-list.style';

interface ExerciseListProp {
    exercises: Exercise[];
    showCheck?: boolean;
    selectedExercises?: string[];
}

class ExerciseList extends Component<ExerciseListProp> {
    constructor(props: ExerciseListProp) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.exercises.map((exercise: Exercise, index: number) => (
                    <ExerciseItem
                        key={exercise.id}
                        exercise={exercise}
                        selected={index % 2 === 0}
                        showCheck={this.props.showCheck}
                    />
                ))}
            </View>
        );
    }
}

export default ExerciseList;
