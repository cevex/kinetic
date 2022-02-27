import { DateTimeService } from '../../../../core/common/date-time.service';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { PathologySessionData } from '../../../../core/domain/pathology/session/pathology-session-data.model';
import { ExerciseGroupElement } from '../../exercices/exercise-group/exercise-group.model';
import { PathologySessionElement } from '../session/pathology-session-element.model';

export class PathologySessionElementService {
    public static mapPathologySession(
        pathologySession: PathologySessionData,
        exercisesForPhase: Exercise[]
    ): PathologySessionElement {
        // getExercicesToDo()
        // getExersiseOfType('posture')
        // --> GRoup By

        return {
            exercisesGroups: [this.mapTodoExercisesGroup(pathologySession, exercisesForPhase)],
            evaluation: null
        };
    }

    private static mapTodoExercisesGroup(
        session: PathologySessionData,
        exercises: Exercise[]
    ): ExerciseGroupElement {
        return {
            title: this.getSessionTitle(session),
            exercises: exercises
        };
    }

    private static mapPostureExercisesGroups(
        session: PathologySessionData,
        exercises: Exercise[]
    ): ExerciseGroupElement[] {
        return [];
    }

    private static getSessionTitle(session: PathologySessionData): string {
        const now = DateTimeService.getNow();
        return 'A faire ' + DateTimeService.formatDayDuration(session.date, now);
    }
}
