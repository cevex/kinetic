import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PathologyEvaluationData } from '../../../../core/domain/pathology/evaluation/pathology-evaluation.model';
import { globalStyles } from '../../../styles';
import KntButton from '../../../ui/button/button.component';
import { UiItem } from '../../../ui/core/ui-item.model';
import KntSelectFlat from '../../../ui/selects/flat/select-flat.component';
import KntSelectRadio from '../../../ui/selects/radio/select-radio.component';
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
                    <View style={globalStyles.card}>
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
                            style={styles.places}
                            items={this.state.locationChoices}
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
                            label={"Passer à l'évaluation"}
                            type="primary"
                            style={styles.controls}
                            onPress={() => this.validateEvaluation()}
                        />
                    </View>
                )}

                {/*----------------------------------------------------------------------------------*/}
                {/*                         Today                                                    */}
                {/*----------------------------------------------------------------------------------*/}
                {!this.state.firstStep && (
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardMessage}>
                            {'Après les exercices je me sens ?'}
                        </Text>
                        <KntSelectFlat
                            style={styles.assessment}
                            items={this.state.assessmentChoices}
                            selectedItemId={this.state.todayChoice?.id}
                            onSelected={(item: UiItem) => {
                                this.setState(
                                    PathologyEvaluationElementService.selectExercisesAssessments(
                                        this.state,
                                        item
                                    )
                                );
                            }}
                        />
                    </View>
                )}
            </View>
        );
    }
}

export default PathologyEvaluation;
