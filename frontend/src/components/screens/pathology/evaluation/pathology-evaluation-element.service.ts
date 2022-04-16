import { PainAssessChoiceTripleType } from '../../../../core/domain/healthcheck-task/choice/pain-assessment-choice.model';
import {
    EvaluationFeelingPlace,
    PathologyEvaluationData
} from '../../../../core/domain/pathology/evaluation/pathology-evaluation.model';
import { UiItem } from '../../../ui/core/ui-item.model';
import { HealthcheckExerciseScreenService } from '../../healtcheck/exercices/healthcheck-exercise-screen.service';
import { PathologyEvaluationState } from './pathology-evaluation-state.model';

export class PathologyEvaluationElementService {
    public static placeItems = [
        {
            id: 'morning',
            label: 'Le matin au réveil'
        },
        {
            id: 'meal',
            label: 'Pendant les repas'
        },
        {
            id: 'transport',
            label: 'Dans les moyens de transport'
        },
        {
            id: 'work',
            label: 'Au travail'
        },
        {
            id: 'home',
            label: 'A la maison'
        },
        {
            id: 'bed',
            label: 'Au lit'
        }
    ];

    // =======================================================================
    //               Mapping
    // =======================================================================

    public static mapState(evaluationData: PathologyEvaluationData): PathologyEvaluationState {
        const assesChoice = HealthcheckExerciseScreenService.tripleChoiceItem;
        const locationChoice = this.placeItems;
        return {
            firstStep: true,
            assessmentChoices: assesChoice,
            exercisesChoice:
                !!evaluationData?.exercisesAssessment &&
                assesChoice.find(choice => choice.id === evaluationData.exercisesAssessment),
            todayChoice:
                !!evaluationData?.todayFeeling &&
                assesChoice.find(choice => choice.id === evaluationData.todayFeeling.assessment),
            locationChoices: locationChoice,
            locationChoice:
                !!evaluationData?.todayFeeling &&
                locationChoice.find(choice => choice.id === evaluationData.todayFeeling.place)
        };
    }

    public static mapToDomain(currentState: PathologyEvaluationState): PathologyEvaluationData {
        return {
            todayFeeling: {
                assessment: <PainAssessChoiceTripleType>currentState.todayChoice.id,
                place: <EvaluationFeelingPlace>currentState.locationChoice.id
            },
            exercisesAssessment: <PainAssessChoiceTripleType>currentState.exercisesChoice.id
        };
    }

    // =======================================================================
    //               UPDATE
    // =======================================================================

    public static selectTodayAssessments(
        currentState: PathologyEvaluationState,
        item: UiItem
    ): PathologyEvaluationState {
        return { ...currentState, todayChoice: item };
    }

    public static selectLocation(
        currentState: PathologyEvaluationState,
        item: UiItem
    ): PathologyEvaluationState {
        return { ...currentState, locationChoice: item };
    }

    public static selectExercisesAssessments(
        currentState: PathologyEvaluationState,
        item: UiItem
    ): PathologyEvaluationState {
        return { ...currentState, exercisesChoice: item };
    }
}
