import { PathologyEvaluation } from '../evaluation/pathology-evaluation.model';

export interface PathologySessionData {
    date: Date;
    doneExercisesId: string[];
    evaluation: PathologyEvaluation;
}
