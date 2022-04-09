import { PainAssessChoiceTripleType } from '../../healthcheck-task/choice/pain-assessment-choice.model';

export declare type EvaluationFeelingPlace =
    | 'morning'
    | 'meal'
    | 'transport'
    | 'work'
    | 'home'
    | 'bed';

export interface PathologyEvaluationData {
    todayFeeling: PathologyEvaluationFeeling;
    exercisesAssessment: PainAssessChoiceTripleType;
}

export interface PathologyEvaluationFeeling {
    assessment: PainAssessChoiceTripleType;
    place: EvaluationFeelingPlace;
}
