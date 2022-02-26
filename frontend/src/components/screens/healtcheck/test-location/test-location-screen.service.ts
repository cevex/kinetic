import { HealthcheckTaskService } from '../../../../core/domain/healthcheck-task/healthcheck-task.service';
import { TestLocationHealthcheckTask } from '../../../../core/domain/healthcheck-task/specific/test-location-healthcheck-task.model';
import { UiItem } from '../../../ui/core/ui-item.model';
import { TestLocationScreenState } from './test-location-screen.model';

export class TestLocationScreenService {
    public static initScreen(taskId: string): TestLocationScreenState {
        const testLocationTask = <TestLocationHealthcheckTask>(
            HealthcheckTaskService.findTaskById(taskId)
        );
        return {
            choices: this.mapChoices(testLocationTask)
        };
    }

    private static mapChoices(testLocationTask: TestLocationHealthcheckTask): UiItem[] {
        return HealthcheckTaskService.getBodyAreas(testLocationTask).map(bodyArea => {
            return {
                id: bodyArea.type,
                label: bodyArea.name,
                icon: '👎'
            };
        });
    }
}
