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
    onSessionValidated: () => void;
    onExerciseAllSelected: () => void;
    onExerciseSelected: (exercise: Exercise) => void;
    onExerciseNavigate: (exercise: Exercise) => void;
}

class PathologySession extends Component<PathologySessionProp> {
    constructor(props: PathologySessionProp) {
        super(props);
    }

    render() {
        return (
            <View style={styles.session}>
                {/*----------------------------------------------------------------------------------*/}
                {/*                         List                                                     */}
                {/*----------------------------------------------------------------------------------*/}
                <ScrollView style={styles.sessionContent}>
                    {this.props.session.exercisesGroups.map(
                        (exerciseGroup: ExerciseGroupElement) => (
                            <ExerciseGroup
                                key={exerciseGroup.id}
                                exerciseGroup={exerciseGroup}
                                secondaryMode={!!exerciseGroup.subGroup?.length}
                                readOnly={this.props.session.readOnly}
                                selectedExercises={this.props.selectedExercises}
                                onExerciseSelected={this.props.onExerciseSelected}
                                onExerciseNavigate={this.props.onExerciseNavigate}
                            />
                        )
                    )}
                </ScrollView>
                {/*----------------------------------------------------------------------------------*/}
                {/*                         Controls                                                 */}
                {/*----------------------------------------------------------------------------------*/}
                {!this.props.session.readOnly && (
                    <View style={styles.controls}>
                        <KntButton
                            label={'Valider toute la séance'}
                            type="success"
                            style={styles.controlsValidate}
                            onPress={() => this.props.onExerciseAllSelected()}
                        />
                        <KntButton
                            label={"Passer à l'évaluation"}
                            type="primary"
                            style={styles.controlsNext}
                            onPress={() => this.props.onSessionValidated()}
                        />
                    </View>
                )}
            </View>
        );
    }
}

export default PathologySession;
