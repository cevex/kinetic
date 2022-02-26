import { ExercisesService } from '../../../../core/domain/exercices/exercises.service';
import { HealthcheckTaskService } from '../../../../core/domain/healthcheck-task/healthcheck-task.service';
import { ExerciseHealthcheckTask } from '../../../../core/domain/healthcheck-task/specific/exercise-healthcheck-task.model';
import { RedoHealthcheckTask } from '../../../../core/domain/healthcheck-task/specific/redo-healthcheck-task.model';
import { Healthcheck } from '../../../../core/domain/healthcheck/healthcheck.model';
import { HealthcheckService } from '../../../../core/domain/healthcheck/healthcheck.service';
import { HealthcheckRedoScreenState } from './healthcheck-redo-screen.model';

export class HealthcheckRedoScreenService {
    public static initScreen(healthcheck: Healthcheck): HealthcheckRedoScreenState {
        const previousTask = <ExerciseHealthcheckTask>(
            HealthcheckService.getPreviousTask(healthcheck)
        );
        const redoTask = <RedoHealthcheckTask>(
            HealthcheckTaskService.findTaskById(healthcheck.taskId)
        );
        return {
            previousExercise: HealthcheckTaskService.getExercise(previousTask),
            exerciseAdditional: ExercisesService.getExercisesById(redoTask.exerciseIdAdditional)
        };
    }
}
