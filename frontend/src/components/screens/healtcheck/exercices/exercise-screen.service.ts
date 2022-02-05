import { cloneDeep } from 'lodash-es';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { ExercisesService } from '../../../../core/domain/exercices/exercises.service';
import { HealthcheckTaskService } from '../../../../core/domain/healthcheck-task/healthcheck-task.service';
import { ExerciseHealthcheckTask } from '../../../../core/domain/healthcheck-task/specific/exercise-healthcheck-task.model';
import I18n from '../../../i18n';
import { UiItem } from '../../../ui/core/ui-item.model';
import { ExerciseScreenState } from './exercise-screen.model';

export class ExerciseScreenService {
    private static dualChoiceItem = [
        {
            id: 'no',
            label: I18n.t('global.no'),
            icon: '👎'
        },
        {
            id: 'yes',
            label: I18n.t('global.yes'),
            icon: '👍'
        }
    ];

    private static tripleChoiceItem = [
        {
            id: 'less',
            label: I18n.t('pain.assessment.less'),
            icon: '😭'
        },
        {
            id: 'equals',
            label: I18n.t('pain.assessment.equals'),
            icon: '😐'
        },
        {
            id: 'more',
            label: I18n.t('pain.assessment.more'),
            icon: '🙂'
        }
    ];

    public static initScreen(taskId: string): ExerciseScreenState {
        const exerciseTask = <ExerciseHealthcheckTask>HealthcheckTaskService.findTaskById(taskId);
        const exercise =
            exerciseTask &&
            exerciseTask.exerciseId &&
            <Exercise>ExercisesService.getExercisesById(exerciseTask.exerciseId);
        return {
            exercise: exercise,
            choices:
                exerciseTask && exerciseTask.choice && exerciseTask.choice.type === 'dual'
                    ? this.dualChoiceItem
                    : this.tripleChoiceItem,
            selectedChoice: null
        };
    }

    public static selectAssessments(
        currentState: ExerciseScreenState,
        item: UiItem
    ): ExerciseScreenState {
        const newState = cloneDeep(currentState);
        newState.selectedChoice = item;
        return newState;
    }
}
