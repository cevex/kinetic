import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import KntSelectProgress from '../../../ui/selects/progress/select-progress.component';
import PathologySession from '../session/pathology-session.component';
import { PathologyPhaseElement } from './pathology-phases-element.model';
import styles from './pathology-phases.styles';

interface PathologyPhaseProp {
    phase: PathologyPhaseElement;
    selectedExercises: string[];
    onExerciseSelected?: (exercise: Exercise) => void;
    onExerciseNavigate?: (exercise: Exercise) => void;
    onSessionSelected: (session: PathologySession) => void;
}

class PathologyPhase extends Component<PathologyPhaseProp> {
    constructor(props: PathologyPhaseProp) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{this.props.phase.phaseName}</Text>
                    <KntSelectProgress
                        style={styles.selectProgress}
                        items={this.props.phase.sessions}
                        selectedItemId={this.props.phase.selectedSession}
                        onSelected={item => {
                            this.props.onSessionSelected(item.data);
                        }}
                    />
                </View>
                <View style={styles.session}>
                    <PathologySession
                        session={this.props.phase.sessionElement}
                        selectedExercises={this.props.selectedExercises}
                        onExerciseSelected={this.props.onExerciseSelected}
                        onExerciseNavigate={this.props.onExerciseNavigate}
                    />
                </View>
            </View>
        );
    }
}

export default PathologyPhase;
