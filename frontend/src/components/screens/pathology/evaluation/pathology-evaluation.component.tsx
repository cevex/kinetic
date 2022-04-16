import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { PathologyEvaluationData } from '../../../../core/domain/pathology/evaluation/pathology-evaluation.model';
import { globalStyles } from '../../../styles';
import KntButton from '../../../ui/actions/button/button.component';
import { UiItem } from '../../../ui/core/ui-item.model';
import KntSelectFlat from '../../../ui/form/selects/flat/select-flat.component';
import KntSelectRadio from '../../../ui/form/selects/radio/select-radio.component';
import { PathologyEvaluationElementService } from './pathology-evaluation-element.service';
import { PathologyEvaluationState } from './pathology-evaluation-state.model';
import styles from './pathology-evaluation.styles';

interface PathologyEvaluationProp {
    evaluation: PathologyEvaluationData;
    onEvaluationSet: (evaluation: PathologyEvaluationData) => void;
}

class PathologyEvaluation extends Component<PathologyEvaluationProp, PathologyEvaluationState> {
    constructor(props: PathologyEvaluationProp) {
        super(props);
        this.state = PathologyEvaluationElementService.mapState(this.props?.evaluation);
    }

    private validateFirst() {
        this.setState({
            ...this.state,
            firstStep: false
        });
    }

    private validateEvaluation() {
        const evaluation = PathologyEvaluationElementService.mapToDomain(this.state);
        this.props.onEvaluationSet(evaluation);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={globalStyles.cardTitle}>{'Evaluation'}</Text>

                {/*----------------------------------------------------------------------------------*/}
                {/*                         Today                                                    */}
                {/*----------------------------------------------------------------------------------*/}
                {this.state.firstStep && (
                    <ScrollView style={styles.content}>
                        <Text style={globalStyles.cardMessage}>
                            {'Comment vous sentez-vous aujourd’hui ?'}
                        </Text>
                        <KntSelectFlat
                            style={styles.assessment}
                            items={this.state.assessmentChoices}
                            selectedItemId={this.state.todayChoice?.id}
                            onSelected={(item: UiItem) => {
                                this.setState(
                                    PathologyEvaluationElementService.selectTodayAssessments(
                                        this.state,
                                        item
                                    )
                                );
                            }}
                        />
                        <KntSelectRadio
                            items={this.state.locationChoices}
                            selectedItemId={this.state.locationChoice.id}
                            onSelected={(item: UiItem) => {
                                this.setState(
                                    PathologyEvaluationElementService.selectLocation(
                                        this.state,
                                        item
                                    )
                                );
                            }}
                        />
                        <KntButton
                            label={'Valider'}
                            type="primary"
                            style={styles.controls}
                            onPress={() => this.validateFirst()}
                        />
                    </ScrollView>
                )}

                {/*----------------------------------------------------------------------------------*/}
                {/*                         Today                                                    */}
                {/*----------------------------------------------------------------------------------*/}
                {!this.state.firstStep && (
                    <ScrollView style={styles.content}>
                        <Text style={globalStyles.cardMessage}>
                            {'Après les exercices je me sens ?'}
                        </Text>
                        <KntSelectFlat
                            style={styles.assessment}
                            items={this.state.assessmentChoices}
                            selectedItemId={this.state.exercisesChoice?.id}
                            onSelected={(item: UiItem) => {
                                this.setState(
                                    PathologyEvaluationElementService.selectExercisesAssessments(
                                        this.state,
                                        item
                                    )
                                );
                            }}
                        />
                        <KntButton
                            label={'Valider'}
                            type="primary"
                            style={styles.controls}
                            onPress={() => this.validateEvaluation()}
                        />
                    </ScrollView>
                )}
            </View>
        );
    }
}

export default PathologyEvaluation;
