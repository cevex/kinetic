import { BodyAreaType } from '../../body/body-area-data.model';
import { HealthcheckTask } from '../healthcheck-task.model';

export interface PainChoiceHealthcheckTask extends HealthcheckTask {
    bodyArea: BodyAreaType;
    more: string;
}
