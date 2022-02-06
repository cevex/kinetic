import { PathologyEvaluation } from '../evaluation/pathology-evaluation.model';

export interface PathologySession {
    date: Date;
    doneExercisesId: string[];
    evaluations: PathologyEvaluation;
}
