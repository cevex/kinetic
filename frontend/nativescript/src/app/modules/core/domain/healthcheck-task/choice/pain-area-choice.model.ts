import { BodyArea, BodyAreaType } from '../../body/body-area-data.model';
import { HealthcheckTask } from '../healthcheck-task.model';

export interface PainAreaChoice {
    bodyArea: BodyAreaType;
    more: string;
}
