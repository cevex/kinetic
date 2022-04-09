import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Logger } from '../../../../core/common/log.service';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { ExercisesService } from '../../../../core/domain/exercices/exercises.service';
import { PainAssessChoiceTripleType } from '../../../../core/domain/healthcheck-task/choice/pain-assessment-choice.model';
import { Healthcheck } from '../../../../core/domain/healthcheck/healthcheck.model';
import { HealthcheckService } from '../../../../core/domain/healthcheck/healthcheck.service';
import {
    PathologyEvaluationData,
    PathologyEvaluationFeeling
} from '../../../../core/domain/pathology/evaluation/pathology-evaluation.model';
import { Pathology } from '../../../../core/domain/pathology/pathology.model';
import { TreatmentArea } from '../../../../core/domain/treatment-area/treatment-area.model';
import { KineticState } from '../../../../core/store/kinetic.state';
import { PathologyActionner } from '../../../../core/store/pathology/pathology.actions';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import { globalStyles } from '../../../styles';
import KntSelectSwitch from '../../../ui/selects/switch/select-switch.component';
import ExerciseList from '../../exercices/list/exercises-list.component';
import PathologyEvaluation from '../evaluation/pathology-evaluation.component';
import PathologyPhase from '../phases/pathology-phases.component';
import { DashboardMode, PathologyDashboardState } from './pathology-dashboard.model';
import { PathologyDashboardService } from './pathology-dashboard.service';
import styles from './pathology-dashboard.style';

interface PathologyDashboardProp extends ScreenProp {
    treatmentArea: TreatmentArea;
    pathology: Pathology;

    startPathology: (healthcheck: Healthcheck) => void;
    markExerciseAsSeen: (exercisesId: string[], seen: boolean) => void;
    evaluateFeelingSession: (evaluationFeeling: PathologyEvaluationFeeling) => void;
    evaluateGlobalSession: (globalAssessment: PainAssessChoiceTripleType) => void;
}

class PathologyDashboardScreen extends Component<PathologyDashboardProp, PathologyDashboardState> {
    constructor(props: PathologyDashboardProp) {
        super(props);
        this.state = PathologyDashboardService.initScreen(
            this.props.treatmentArea,
            this.props.pathology,
            'phase'
        );
        Logger.log('[PathologyDashboardScreen] INIT state ==>', this.state);
    }

    componentDidUpdate(
        prevProps: Readonly<PathologyDashboardProp>,
        prevState: Readonly<PathologyDashboardState>
    ) {
        if (prevProps.pathology !== this.props.pathology) {
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
        Logger.log('validateSession');
        this.setState(PathologyDashboardService.selectExercise(this.state, exercise));
    }

    // =======================================================================
    //               Exercises
    // =======================================================================

    private showExercise(exercise: Exercise) {
        this.props.navigation.navigate('Exercise', {
            exerciseId: exercise.id
        });
    }

    private selectExercise(exercise: Exercise) {
        this.setState(PathologyDashboardService.selectExercise(this.state, exercise));
    }

    private setEvaluation(evaluation: PathologyEvaluationData) {
        // this.setState();
    }

    private toggleExercises() {
        Logger.log('toggleExercises');
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
                                onExerciseAllSelected={() => this.toggleExercises()}
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
                    <View style={globalStyles.modalContainer}>
                        <View style={globalStyles.modal}>
                            <PathologyEvaluation
                                evaluation={this.state.currentSession.evaluation}
                                onEvaluationSet={() =>
                                    this.setEvaluation(this.state.currentSession.evaluation)
                                }
                            />
                        </View>
                    </View>
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
        markExerciseAsSeen: (exercisesId: string[], seen: boolean) => {
            dispatch(PathologyActionner.markExerciseAsSeen(exercisesId, seen));
        },
        evaluateFeelingSession: (evaluationFeeling: PathologyEvaluationFeeling) => {
            dispatch(PathologyActionner.evaluateFeelingSession(evaluationFeeling));
        },
        evaluateGlobalSession: (globalAssessment: PainAssessChoiceTripleType) => {
            dispatch(PathologyActionner.evaluateGlobalSession(globalAssessment));
        }
    })
)(PathologyDashboardScreen);
