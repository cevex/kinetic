import { PathologyEvaluation } from '../evaluation/pathology-evaluation.model';

export interface PathologySessionData {
    // Date as string format (toUTCString()) for parseable value
    dateUTC: string;
    doneExercisesId: string[];
    evaluation: PathologyEvaluation;
}
