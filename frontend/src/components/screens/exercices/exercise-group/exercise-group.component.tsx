import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { globalStyles, globalVariables } from '../../../styles';
import ExerciseList from '../list/exercises-list.component';
import { ExerciseGroupElement } from './exercise-group.model';
import styles from './exercise-group.styles';

interface ExerciseGroupProp {
    exerciseGroup: ExerciseGroupElement;
    selectedExercises: string[];
    secondaryMode?: boolean;
    onExerciseSelected?: (exercise: Exercise) => void;
}

class ExerciseGroup extends Component<ExerciseGroupProp> {
    constructor(props: ExerciseGroupProp) {
        super(props);
    }

    render() {
        return (
            <View style={styles.exerciseGroup}>
                <View style={styles.exerciseGroupHeader}>
                    <View style={styles.exerciseGroupHeaderTitle}>
                        <Icon
                            name={this.props.secondaryMode ? 'caret-right' : 'calendar'}
                            size={25}
                            color={
                                this.props.secondaryMode
                                    ? globalVariables.color.primary
                                    : globalVariables.color.accent
                            }
                        />
                        <Text style={globalStyles.cardTitle}>{this.props.exerciseGroup.title}</Text>
                    </View>
                    <Text style={styles.exerciseGroupHeaderAside}>20min</Text>
                </View>
                <View style={styles.exerciseGroupContent}>
                    <ExerciseList
                        exercises={this.props.exerciseGroup.exercises}
                        showCheck={!this.props.secondaryMode}
                        selectedExercises={this.props.selectedExercises}
                        onExerciseSelected={this.props.onExerciseSelected}
                    />
                </View>
            </View>
        );
    }
}

export default ExerciseGroup;
