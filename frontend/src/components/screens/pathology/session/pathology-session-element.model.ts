import { PathologyEvaluation } from '../../../../core/domain/pathology/evaluation/pathology-evaluation.model';
import { ExerciseGroupElement } from '../../exercices/exercise-group/exercise-group.model';

export interface PathologySessionElement {
    exercisesGroups: ExerciseGroupElement[];
    evaluation: PathologyEvaluation;
}
