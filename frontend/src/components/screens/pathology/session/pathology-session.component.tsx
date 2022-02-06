import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles, globalVariables } from '../../../styles';
import KntButton from '../../../ui/button/button.component';
import KntSelectProgres from '../../../ui/selects/select-progress.component';
import ExerciseList from '../../exercices/list/exercises-list.component';
import { PathologySessionState } from './pathology-session.model';

interface PathologySessionProp {
    session: PathologySessionState;
}

class PathologySession extends Component<PathologySessionProp> {
    private getTitle(): string {
        return (
            'Phase ' +
            this.props.session.phaseName +
            '(Séance ' +
            this.props.session.currentSession +
            '/' +
            this.props.session.nbSession +
            ')'
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={globalStyles.cardMessage}>{this.getTitle()}</Text>
                    <KntSelectProgres
                        items={this.props.session.sessions}
                        selectedItemId={this.props.session.selectedSession}
                    />
                </View>
                <View style={styles.session}>
                    <View style={styles.sessionHeader}>
                        <Text style={globalStyles.cardMessage}>A faire auhourd'hui</Text>
                        <Text style={globalStyles.cardMessage}>20min</Text>
                    </View>
                    <ExerciseList
                        exercises={this.props.session.exercises}
                        selectedExercises={this.props.session.selectedExercises}
                    />
                </View>
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    session: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sessionHeader: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    controls: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlsValidate: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlsNext: {
        backgroundColor: globalVariables.color.white
    }
});

export default PathologySession;
