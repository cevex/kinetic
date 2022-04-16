import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { ExercisesService } from '../../../../core/domain/exercices/exercises.service';
import { Healthcheck } from '../../../../core/domain/healthcheck/healthcheck.model';
import { HealthcheckService } from '../../../../core/domain/healthcheck/healthcheck.service';
import { PathologyEvaluationData } from '../../../../core/domain/pathology/evaluation/pathology-evaluation.model';
import { Pathology } from '../../../../core/domain/pathology/pathology.model';
import { PathologySessionData } from '../../../../core/domain/pathology/session/pathology-session-data.model';
import { TreatmentArea } from '../../../../core/domain/treatment-area/treatment-area.model';
import { KineticState } from '../../../../core/store/kinetic.state';
import { PathologyActionner } from '../../../../core/store/pathology/pathology.actions';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import KntModal from '../../../ui/content/modal/modal.component';
import KntSelectSwitch from '../../../ui/form/selects/switch/select-switch.component';
import ExerciseList from '../../exercices/list/exercises-list.component';
import PathologyEvaluation from '../evaluation/pathology-evaluation.component';
import PathologyPhase from '../phases/pathology-phases.component';
import { PathologySessionElementService } from '../session/pathology-session-element.service';
import { DashboardMode, PathologyDashboardState } from './pathology-dashboard.model';
import { PathologyDashboardService } from './pathology-dashboard.service';
import styles from './pathology-dashboard.style';

interface PathologyDashboardProp extends ScreenProp {
    treatmentArea: TreatmentArea;
    pathology: Pathology;

    startPathology: (healthcheck: Healthcheck) => void;
    markAllExerciseAsSeen: (session: PathologySessionData, exercisesId: string[]) => void;
    markExerciseAsSeen: (session: PathologySessionData, exercisesId: string) => void;
    evaluateSession: (session: PathologySessionData, evaluation: PathologyEvaluationData) => void;
}

class PathologyDashboardScreen extends Component<PathologyDashboardProp, PathologyDashboardState> {
    constructor(props: PathologyDashboardProp) {
        super(props);
        this.state = PathologyDashboardService.initScreen(
            this.props.treatmentArea,
            this.props.pathology,
            'phase'
        );
    }

    componentDidUpdate(
        prevProps: Readonly<PathologyDashboardProp>,
        prevState: Readonly<PathologyDashboardState>
    ) {
        if (prevProps.pathology !== this.props.pathology) {
            // Logger.log(
            //     '[PathologyDashboardScreen] Updating screen',
            //     this.props.pathology.phases[0]
            // );
            this.setState(
                PathologyDashboardService.updateScreen(
                    this.state,
                    this.props.treatmentArea,
                    this.props.pathology
                )
            );
        }
    }

    private setDashboardMode(dashboardMode: DashboardMode) {
        this.setState(PathologyDashboardService.setDashboardMode(this.state, dashboardMode));
    }

    // =======================================================================
    //               Phases
    // =======================================================================

    private showPreviousPhase() {
        this.setState(
            PathologyDashboardService.goPreviousPhase(
                this.state,
                this.props.treatmentArea,
                this.props.pathology
            )
        );
    }

    private showNextPhase() {
        this.setState(
            PathologyDashboardService.goNextPhase(
                this.state,
                this.props.treatmentArea,
                this.props.pathology
            )
        );
    }

    // =======================================================================
    //               Sessions
    // =======================================================================

    private showSession(sessionIndex: number) {
        this.setState(
            PathologyDashboardService.goToSession(
                this.state,
                sessionIndex,
                this.props.treatmentArea,
                this.props.pathology
            )
        );
    }

    private validateSession() {
        this.setState(PathologyDashboardService.showEvaluation(this.state));
    }

    private setEvaluation(evaluation: PathologyEvaluationData) {
        this.setState(PathologyDashboardService.hideEvaluation(this.state));
        this.props.evaluateSession(this.state.currentSession, evaluation);
    }

    // =======================================================================
    //               Exercises
    // =======================================================================

    private showExercise(exercise: Exercise) {
        this.props.navigation.navigate('Exercise', {
            exerciseId: exercise.id
        });
    }

    private selectAllExercises() {
        const allExercises = PathologySessionElementService.getCheckableExercises(
            this.state.pathologyPhase.sessionElement
        ).map(e => e.id);
        this.props.markAllExerciseAsSeen(this.state.currentSession, allExercises);
    }

    private selectExercise(exercise: Exercise) {
        this.props.markExerciseAsSeen(this.state.currentSession, exercise.id);
    }

    // =======================================================================
    //               Component
    // =======================================================================

    render() {
        return (
            <View style={styles.container}>
                {/*----------------------------------------------------------------------------------*/}
                {/*                         Header                                                   */}
                {/*----------------------------------------------------------------------------------*/}

                <View style={styles.header}>
                    <View style={styles.headerTitle}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Home');
                            }}>
                            <Icon name="home" size={25} color="#432C81" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitleText}>{this.state.dashboardTitle}</Text>
                    </View>
                    <KntSelectSwitch
                        style={styles.headerChoice}
                        items={this.state.dashboardModeOptions}
                        selectedItemId={this.state.selectedDashboardMode.id}
                        onSelected={item => this.setDashboardMode(item.id as DashboardMode)}
                    />
                </View>

                {/*----------------------------------------------------------------------------------*/}
                {/*                         Phases                                                   */}
                {/*----------------------------------------------------------------------------------*/}
                {this.state.selectedDashboardMode &&
                    this.state.selectedDashboardMode.id === 'phase' && (
                        <View style={styles.sessionContainer}>
                            <PathologyPhase
                                phase={this.state.pathologyPhase}
                                onShowPreviousPhase={() => this.showPreviousPhase()}
                                onShowNextPhase={() => this.showNextPhase()}
                                onSessionSelected={sessionIndex => this.showSession(sessionIndex)}
                                onSessionValidated={() => this.validateSession()}
                                selectedExercises={this.state.currentSession.doneExercisesId}
                                onExerciseAllSelected={() => this.selectAllExercises()}
                                onExerciseNavigate={exercise => this.showExercise(exercise)}
                                onExerciseSelected={exercise => this.selectExercise(exercise)}
                            />
                        </View>
                    )}

                {/*----------------------------------------------------------------------------------*/}
                {/*                         Videos                                                   */}
                {/*----------------------------------------------------------------------------------*/}
                {!this.state.selectedDashboardMode ||
                    (this.state.selectedDashboardMode.id === 'video-library' && (
                        <ScrollView style={{ width: '100%' }}>
                            <ExerciseList
                                exercises={ExercisesService.getExercises()}
                                showCheck={false}
                                onExerciseNavigate={(exercise: Exercise) => {
                                    this.props.navigation.navigate('Exercise', {
                                        exerciseId: exercise.id
                                    });
                                }}
                            />
                        </ScrollView>
                    ))}

                {/*----------------------------------------------------------------------------------*/}
                {/*                         Modal                                                    */}
                {/*----------------------------------------------------------------------------------*/}
                {!!this.state.showEvaluation && (
                    <KntModal>
                        <PathologyEvaluation
                            evaluation={this.state.currentSession.evaluation}
                            onEvaluationSet={() =>
                                this.setEvaluation(this.state.currentSession.evaluation)
                            }
                        />
                    </KntModal>
                )}
            </View>
        );
    }
}

// =======================================================================
//               State connection
// =======================================================================

export default connect(
    (state: KineticState) => ({
        treatmentArea: HealthcheckService.getTreatmentArea(state.onGoingHealthcheck),
        pathology: state.pathology
    }),
    (dispatch: Dispatch) => ({
        markAllExerciseAsSeen: (session: PathologySessionData, exercisesId: string[]) => {
            dispatch(PathologyActionner.markAllExerciseAsSeen(session, exercisesId));
        },
        markExerciseAsSeen: (session: PathologySessionData, exercisesId: string) => {
            dispatch(PathologyActionner.markExerciseAsSeen(session, exercisesId));
        },
        evaluateSession: (session: PathologySessionData, evaluation: PathologyEvaluationData) => {
            dispatch(PathologyActionner.evaluateSession(session, evaluation));
        }
    })
)(PathologyDashboardScreen);
