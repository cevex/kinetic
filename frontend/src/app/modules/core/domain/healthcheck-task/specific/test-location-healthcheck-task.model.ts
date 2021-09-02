import { HealthcheckTask } from '../healthcheck-task.model';

export declare type TestLocationType = 'body-map' | 'list'

export class TestLocationHealthcheckTask extends HealthcheckTask {
    testType: TestLocationType;
    painChoices: string[];
}
