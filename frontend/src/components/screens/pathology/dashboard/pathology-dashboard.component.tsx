import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ExercisesService } from '../../../../core/domain/exercices/exercises.service';
import { PainAssessChoiceTripleType } from '../../../../core/domain/healthcheck-task/choice/pain-assessment-choice.model';
import { Healthcheck } from '../../../../core/domain/healthcheck/healthcheck.model';
import { PathologyEvaluationFeeling } from '../../../../core/domain/pathology/evaluation/pathology-evaluation.model';
import { Pathology } from '../../../../core/domain/pathology/pathology.model';
import { KineticState } from '../../../../core/store/kinetic.state';
import { PathologyActionner } from '../../../../core/store/pathology/pathology.actions';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import { globalVariables } from '../../../styles';
import { UiItem } from '../../../ui/core/ui-item.model';
import KntSelectSwitch from '../../../ui/selects/switch/select-switch.component';
import ExerciseList from '../../exercices/list/exercises-list.component';
import PathologySession from '../session/pathology-session.component';
import { DashboardMode, PathologyDashboardState } from './pathology-dashboard.model';
import { PathologyDashboardService } from './pathology-dashboard.service';

interface PathologyDashboardProp extends ScreenProp {
    pathology: Pathology;

    startPathology: (healthcheck: Healthcheck) => void;
    markExerciseAsSeen: (exercisesId: string[], seen: boolean) => void;
    evaluateFeelingSession: (evaluationFeeling: PathologyEvaluationFeeling) => void;
    evaluateGlobalSession: (globalAssessment: PainAssessChoiceTripleType) => void;
}

class PathologyDashboardScreen extends Component<PathologyDashboardProp, PathologyDashboardState> {
    constructor(props: PathologyDashboardProp) {
        super(props);
        this.state = PathologyDashboardService.initScreen(this.props.pathology, 'phase');
        console.log('[PathologyDashboardScreen] state', this.state);
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
                        {/*<Text style={styles.headerTitleText}>{I18n.t('pain.area.selectPain')}</Text>*/}
                        <Text style={styles.headerTitleText}>Lombalgie aigue L5 S1</Text>
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
                            <PathologySession session={this.state.session} />
                        </View>
                    )}
                {!this.state.selectedDashboardMode ||
                    (this.state.selectedDashboardMode.id === 'video-library' && (
                        <ScrollView style={{ width: '100%' }}>
                            <ExerciseList
                                exercises={ExercisesService.getExercises()}
                                // selectedExercises={this.props.session?.selectedExercises}
                            />
                        </ScrollView>
                    ))}
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
        width: '100%',
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: '100%',
        flex: 1,
        paddingLeft: 15
    },
    headerTitleText: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.xbig,
        fontWeight: '600',
        marginLeft: 10
    },
    headerChoice: {
        height: 50,
        alignItems: 'center',
        margin: 10
    },
    sessionContainer: {
        flex: 1,
        width: '100%'
    }
});

export default connect(
    (state: KineticState) => ({
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
