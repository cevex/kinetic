import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PainAssessChoiceTripleType } from '../../../../core/domain/healthcheck-task/choice/pain-assessment-choice.model';
import { Healthcheck } from '../../../../core/domain/healthcheck/healthcheck.model';
import { PathologyEvaluationFeeling } from '../../../../core/domain/pathology/evaluation/pathology-evaluation.model';
import { Pathology } from '../../../../core/domain/pathology/pathology.model';
import { KineticState } from '../../../../core/store/kinetic.state';
import { PathologyActionner } from '../../../../core/store/pathology/pathology.actions';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import I18n from '../../../i18n';
import { globalVariables } from '../../../styles';
import { UiItem } from '../../../ui/core/ui-item.model';
import KntSelectSwitch from '../../../ui/selects/select-switch.component';
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
                        <Icon name="bars" size={30} color="#900" />
                        <Text style={styles.headerTitleText}>{I18n.t('pain.area.selectPain')}</Text>
                    </View>
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
                {/*<View style={styles.headerTitle}>*/}
                {/*    <PathologySession session={this.state.session} />*/}
                {/*</View>*/}
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {},
    headerTitleText: {}
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
