import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { UiItem } from '../../../ui/core/ui-item.model';
import KntSelectProgress from '../../../ui/selects/progress/select-progress.component';
import PathologySession from '../session/pathology-session.component';
import { PathologyPhaseElement } from './pathology-phases-element.model';
import styles from './pathology-phases.styles';

interface PathologyPhaseProp {
    // Phases
    phase: PathologyPhaseElement;
    onShowPreviousPhase?: () => void;
    onShowNextPhase?: () => void;

    // Sessions
    onSessionSelected: (sessionIndex: number) => void;
    onSessionValidated?: () => void;

    // Exercises
    selectedExercises: string[];
    onExerciseAllSelected?: () => void;
    onExerciseSelected?: (exercise: Exercise) => void;
    onExerciseNavigate?: (exercise: Exercise) => void;
}

class PathologyPhase extends Component<PathologyPhaseProp> {
    constructor(props: PathologyPhaseProp) {
        super(props);
    }

    private selectSession(item: UiItem) {
        const sessionIndex = this.props.phase.sessions.findIndex(session => session.id === item.id);
        this.props.onSessionSelected(sessionIndex);
    }

    render() {
        return (
            <View style={styles.container}>
                {/*----------------------------------------------------------------------------------*/}
                {/*                         Header                                                   */}
                {/*----------------------------------------------------------------------------------*/}
                <View style={styles.header}>
                    <View style={styles.headerTitle}>
                        {this.props.phase.hasPrevious && (
                            <TouchableOpacity
                                style={styles.headerTitleIcon}
                                onPress={() => this.props.onShowPreviousPhase()}>
                                <Icon name="arrow-left" size={20} color="#432C81" />
                            </TouchableOpacity>
                        )}
                        <Text style={styles.headerText}>{this.props.phase.phaseName}</Text>

                        {this.props.phase.hasNext && (
                            <TouchableOpacity
                                style={styles.headerTitleIcon}
                                onPress={() => this.props.onShowNextPhase()}>
                                <Icon name="arrow-right" size={20} color="#432C81" />
                            </TouchableOpacity>
                        )}
                    </View>

                    <ScrollView horizontal={true} style={styles.headerProgress}>
                        <KntSelectProgress
                            key={this.props.phase.selectedSession}
                            items={this.props.phase.sessions}
                            selectedItemId={this.props.phase.selectedSession}
                            onSelected={item => this.selectSession(item)}
                        />
                    </ScrollView>
                </View>
                {/*----------------------------------------------------------------------------------*/}
                {/*                         Sessions                                                 */}
                {/*----------------------------------------------------------------------------------*/}
                <View style={styles.session}>
                    <PathologySession
                        session={this.props.phase.sessionElement}
                        selectedExercises={this.props.selectedExercises}
                        onSessionValidated={this.props.onSessionValidated}
                        onExerciseAllSelected={this.props.onExerciseAllSelected}
                        onExerciseSelected={this.props.onExerciseSelected}
                        onExerciseNavigate={this.props.onExerciseNavigate}
                    />
                </View>
            </View>
        );
    }
}

export default PathologyPhase;
