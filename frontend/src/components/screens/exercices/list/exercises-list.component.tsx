import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { globalVariables } from '../../../styles';
import ExerciseItem from '../item/exercises-item.component';

interface ExerciseListProp {
    exercises: Exercise[];
    selectedExercises: string[];
}

class ExerciseList extends Component<ExerciseListProp> {
    constructor(props: ExerciseListProp) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.exercises.map((exercise: Exercise, index: number) => (
                    <ExerciseItem key={exercise.id} exercise={exercise} selected={false} />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',

        width: '100%',
        height: 44,

        backgroundColor: globalVariables.color.grey.light,
        borderRadius: 8
    }
});

export default ExerciseList;
