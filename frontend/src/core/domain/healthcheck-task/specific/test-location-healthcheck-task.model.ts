import { HealthcheckTask } from '../healthcheck-task.model';

export declare type TestLocationType = 'body-map' | 'list';

export interface TestLocationHealthcheckTask extends HealthcheckTask {
    type: 'test-location';
    testType: TestLocationType;
    painChoices: string[];
}
