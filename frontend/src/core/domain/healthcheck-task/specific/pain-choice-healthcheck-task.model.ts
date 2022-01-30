import { BodyAreaType } from '../../body/body-area-data.model';
import { HealthcheckTask } from '../healthcheck-task.model';

export interface PainChoiceHealthcheckTask extends HealthcheckTask {
    type: 'pain-choice';
    bodyArea: BodyAreaType;
    more: string;
}
