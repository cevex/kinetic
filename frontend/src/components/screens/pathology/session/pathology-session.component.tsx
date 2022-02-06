import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ExercisesService } from '../../../../core/domain/exercices/exercises.service';
import { globalVariables } from '../../../styles';
import KntButton from '../../../ui/button/button.component';
import ExerciseList from '../../exercices/list/exercises-list.component';
import { PathologySessionState } from './pathology-session.model';

interface PathologySessionProp {
    session: PathologySessionState;
}

class PathologySession extends Component<PathologySessionProp> {
    private getTitle(): string {
        // return (
        //     'Phase ' +
        //     this.props.session.phaseName +
        //     '(Séance ' +
        //     this.props.session.currentSession +
        //     '/' +
        //     this.props.session.nbSession +
        //     ')'
        // );

        return 'Phase inflammatoire (Séance 3/4)';
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{this.getTitle()}</Text>
                    {/*<KntSelectProgress*/}
                    {/*    items={this.props.session?.sessions}*/}
                    {/*    selectedItemId={this.props.session?.selectedSession}*/}
                    {/*/>*/}
                </View>
                <View style={styles.session}>
                    <View style={styles.sessionHeader}>
                        <View style={styles.sessionHeaderTitle}>
                            <Icon name="calendar" size={25} color="#432C81" />
                            <Text style={styles.headerText}>A faire aujourd'hui</Text>
                        </View>
                        <Text style={styles.sessionHeaderAsside}>20min</Text>
                    </View>
                    <ScrollView style={{ width: '100%' }}>
                        <ExerciseList
                            exercises={ExercisesService.getExercises()}
                            showCheck={true}
                            // selectedExercises={this.props.session?.selectedExercises}
                        />
                    </ScrollView>
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        backgroundColor: globalVariables.color.white,
        // flex: 1,
        width: '100%',
        height: 40
    },
    headerText: {
        color: globalVariables.color.primary,
        marginLeft: 10,
        fontSize: globalVariables.fontSize.medium,
        fontWeight: '600'
    },
    session: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    sessionHeader: {
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sessionHeaderTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    sessionHeaderTitleText: {
        color: globalVariables.color.primary,
        paddingLeft: 10,
        fontSize: globalVariables.fontSize.medium,
        fontWeight: '600'
    },
    sessionHeaderAsside: {
        color: globalVariables.color.accent,
        fontSize: globalVariables.fontSize.medium,
        fontWeight: '600'
    },
    controls: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white'
    },
    controlsValidate: {
        marginBottom: 10,
        width: '95%'
    },
    controlsNext: {
        marginBottom: 10,
        width: '95%'
    }
});

export default PathologySession;
