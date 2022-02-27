import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import KntButton from '../../../ui/button/button.component';
import ExerciseGroup from '../../exercices/exercise-group/exercise-group.component';
import { ExerciseGroupElement } from '../../exercices/exercise-group/exercise-group.model';
import { PathologySessionElement } from './pathology-session-element.model';
import styles from './pathology-session.styles';

interface PathologySessionProp {
    session: PathologySessionElement;
    selectedExercises: string[];
    onExerciseSelected?: (exercise: Exercise) => void;
}

class PathologySession extends Component<PathologySessionProp> {
    constructor(props: PathologySessionProp) {
        super(props);
    }

    render() {
        return (
            <View style={styles.session}>
                <ScrollView style={styles.sessionContent}>
                    {this.props.session.exercisesGroups.map(
                        (exerciseGroup: ExerciseGroupElement) => (
                            <ExerciseGroup
                                key={JSON.stringify(exerciseGroup)}
                                exerciseGroup={exerciseGroup}
                                secondaryMode={!exerciseGroup.subGroup?.length}
                                selectedExercises={this.props.selectedExercises}
                                onExerciseSelected={this.props.onExerciseSelected}
                            />
                        )
                    )}
                </ScrollView>
                <View style={styles.controls}>
                    <KntButton
                        label={'Valider toute la séance'}
                        type="success"
                        style={styles.controlsValidate}
                    />
                    <KntButton
                        label={'Passer à la phase suivante'}
                        type="primary"
                        style={styles.controlsNext}
                    />
                </View>
            </View>
        );
    }
}

export default PathologySession;
