import { PathologyEvaluation, PathologyEvaluationFeeling } from './pathology-evaluation.model';

export class PathologyEvaluationService {
    constructor() {}

    public static isEvaluationEmpty(evaluation: PathologyEvaluation): boolean {
        return (
            !evaluation || !evaluation.globalAssessment || this.isFeelingEmpty(evaluation.feeling)
        );
    }

    public static isFeelingEmpty(evaluationFeeling: PathologyEvaluationFeeling): boolean {
        return !evaluationFeeling || !evaluationFeeling.assessment || !evaluationFeeling.place;
    }
}
