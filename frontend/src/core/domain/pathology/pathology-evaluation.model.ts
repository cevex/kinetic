import { PainAssessChoiceTripleType } from '../healthcheck-task/choice/pain-assessment-choice.model';

export declare type EvaluationFeelingPlace =
    | 'morning'
    | 'meal'
    | 'transport'
    | 'work'
    | 'home'
    | 'bed';

export interface PathologyEvaluation {
    feeling: PathologyEvaluationFeeling;
    globalAssessment: PainAssessChoiceTripleType;
}

export interface PathologyEvaluationFeeling {
    assessment: PainAssessChoiceTripleType;
    place: EvaluationFeelingPlace;
}
