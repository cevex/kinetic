import { PathologyEvaluation } from './pathology-evaluation.model';

export interface PathologySession {
    date: Date;
    doneExercisesId: string[];
    evaluations: PathologyEvaluation;
}
