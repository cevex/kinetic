import { PathologyEvaluationData, PathologyEvaluationFeeling } from './pathology-evaluation.model';

export class PathologyEvaluationService {
    constructor() {}

    public static isEvaluationEmpty(evaluation: PathologyEvaluationData): boolean {
        return (
            !evaluation ||
            !evaluation.exercisesAssessment ||
            this.isFeelingEmpty(evaluation.todayFeeling)
        );
    }

    public static isFeelingEmpty(evaluationFeeling: PathologyEvaluationFeeling): boolean {
        return !evaluationFeeling || !evaluationFeeling.assessment || !evaluationFeeling.place;
    }
}
