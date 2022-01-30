import { PainAreaChoice } from '../choice/pain-area-choice.model';
import { HealthcheckTask } from '../healthcheck-task.model';

export interface ChangeLocationHealthcheckTask extends HealthcheckTask, PainAreaChoice {
    type: 'change-location';
}
