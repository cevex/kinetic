import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { ExercisesService } from '../../../../core/domain/exercices/exercises.service';
import { PainAssessChoiceTripleType } from '../../../../core/domain/healthcheck-task/choice/pain-assessment-choice.model';
import { Healthcheck } from '../../../../core/domain/healthcheck/healthcheck.model';
import { HealthcheckService } from '../../../../core/domain/healthcheck/healthcheck.service';
import { PathologyEvaluationFeeling } from '../../../../core/domain/pathology/evaluation/pathology-evaluation.model';
import { Pathology } from '../../../../core/domain/pathology/pathology.model';
import { TreatmentArea } from '../../../../core/domain/treatment-area/treatment-area.model';
import { KineticState } from '../../../../core/store/kinetic.state';
import { PathologyActionner } from '../../../../core/store/pathology/pathology.actions';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import I18n from '../../../i18n';
import { UiItem } from '../../../ui/core/ui-item.model';
import KntSelectSwitch from '../../../ui/selects/switch/select-switch.component';
import ExerciseList from '../../exercices/list/exercises-list.component';
import PathologyPhase from '../phases/pathology-phases.component';
import PathologySession from '../session/pathology-session.component';
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
        console.log('[PathologyDashboardScreen] INIT state', this.state);
    }

    componentDidUpdate(
        prevProps: Readonly<PathologyDashboardProp>,
        prevState: Readonly<PathologyDashboardState>
    ) {
        if (prevProps.pathology !== this.props.pathology) {
            console.log('[PathologyDashboardScreen] UPDATE state', this.state);

            this.setState(
                PathologyDashboardService.updateScreen(
                    this.state,
                    this.props.treatmentArea,
                    this.props.pathology
                )
            );
        }
    }

    render() {
        return (
            // =============================================================
            //              HEADER
            // =============================================================
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTitle}>
                        <Icon name="bars" size={25} color="#432C81" />
                        <Text style={styles.headerTitleText}>{I18n.t('pain.area.selectPain')}</Text>
                    </View>
                    <View style={styles.headerChoice}>
                        <KntSelectSwitch
                            items={this.state.dashboardModeOptions}
                            selectedItemId={this.state.selectedDashboardMode.id}
                            onSelected={(item: UiItem) => {
                                this.setState(
                                    PathologyDashboardService.setDashboardMode(
                                        this.state,
                                        item.id as DashboardMode
                                    )
                                );
                            }}
                        />
                    </View>
                </View>

                {this.state.selectedDashboardMode &&
                    this.state.selectedDashboardMode.id === 'phase' && (
                        <View style={styles.sessionContainer}>
                            <PathologyPhase
                                phase={this.state.pathologyPhase}
                                selectedExercises={this.state.currentSession.doneExercisesId}
                                onExerciseSelected={(exercise: Exercise) => {
                                    console.log('onExerciseSelected', exercise);
                                }}
                                onSessionSelected={(session: PathologySession) => {
                                    console.log('onSessionSelected', session);
                                }}
                            />
                        </View>
                    )}
                {!this.state.selectedDashboardMode ||
                    (this.state.selectedDashboardMode.id === 'video-library' && (
                        <ScrollView style={{ width: '100%' }}>
                            <ExerciseList
                                exercises={ExercisesService.getExercises()}
                                showCheck={false}
                                onExerciseSelected={(exercise: Exercise) => {
                                    console.log(exercise);
                                }}
                            />
                        </ScrollView>
                    ))}
            </View>
        );
    }
}

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
