import { DateTimeService } from '../../../../core/common/date-time.service';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { PathologySessionData } from '../../../../core/domain/pathology/session/pathology-session-data.model';
import { ExerciseGroupElement } from '../../exercices/exercise-group/exercise-group.model';
import { PathologySessionElement } from '../session/pathology-session-element.model';

export class PathologySessionElementService {
    public static mapPathologySession(
        pathologySession: PathologySessionData,
        exercisesForPhase: Exercise[],
        sessionReadOnly: boolean
    ): PathologySessionElement {
        // getExercicesToDo()
        // getExersiseOfType('posture')
        // --> GRoup By

        return {
            readOnly: sessionReadOnly,
            exercisesGroups: [this.mapTodoExercisesGroup(pathologySession, exercisesForPhase)],
            evaluation: null
        };
    }

    public static mapTodoExercisesGroup(
        session: PathologySessionData,
        exercises: Exercise[]
    ): ExerciseGroupElement {
        const title = this.getSessionTitle(session);
        return {
            id: this.getExerciseGroupId(title, exercises),
            title: title,
            exercises: exercises
        };
    }

    public static getExerciseGroupId(title: string, exercises: Exercise[]): string {
        return title + exercises.map(exercise => exercise.id).join('#');
    }

    private static mapPostureExercisesGroups(
        session: PathologySessionData,
        exercises: Exercise[]
    ): ExerciseGroupElement[] {
        return [];
    }

    private static getSessionTitle(session: PathologySessionData): string {
        const now = DateTimeService.getNow();
        return 'A faire ' + DateTimeService.formatDayDuration(new Date(session.dateUTC), now);
    }

    public static getCheckableExercises(session: PathologySessionElement): Exercise[] {
        return session.exercisesGroups.reduce((allExercices, group) => {
            return group.exercises?.length ? allExercices.concat(group.exercises) : allExercices;
        }, []);
    }
}
