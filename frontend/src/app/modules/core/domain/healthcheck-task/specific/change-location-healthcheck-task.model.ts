import { PainAreaChoice } from '~/app/modules/core/domain/healthcheck-task/choice/pain-area-choice.model';
import { HealthcheckTask } from '../healthcheck-task.model';

export interface ChangeLocationHealthcheck extends HealthcheckTask, PainAreaChoice {
}
