import { HealthcheckTask } from '../healthcheck-task.model';

export declare type TestLocationType = 'body-map' | 'list'

export interface TestLocationHealthcheckTask extends HealthcheckTask {
    testType: TestLocationType;
    painChoices: string[];
}
