import { PathologyEvaluationData } from '../../../../core/domain/pathology/evaluation/pathology-evaluation.model';
import { ExerciseGroupElement } from '../../exercices/exercise-group/exercise-group.model';

export interface PathologySessionElement {
    readOnly?: boolean;
    exercisesGroups: ExerciseGroupElement[];
    evaluation: PathologyEvaluationData;
}
