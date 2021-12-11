import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BodyArea } from '~/app/modules/core/domain/body/body-area-data.model';
import { DiagnosisDataServiceCache } from '~/app/modules/core/domain/diagnosis/diagnosis-data.service.cache';
import { Diagnosis } from '~/app/modules/core/domain/diagnosis/diagnosis.model';
import { DiagnosisHealthcheckTask } from '~/app/modules/core/domain/healthcheck-task/specific/diagnosis-healthcheck-task.model';
import { HealthcheckRouterService } from '~/app/modules/core/router/healthcheck-router.service';
import { UserRouterService } from '~/app/modules/core/router/user-router.service';

@Component({
    selector: 'knt-consult',
    templateUrl: './consult.component.html',
    styleUrls: ['./consult.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultComponent implements OnInit {

    public diagnosisTask: DiagnosisHealthcheckTask;
    public diagnosis: Diagnosis;
    public bodyArea: BodyArea;

    constructor(
        private healthcheckRouterService: HealthcheckRouterService,
        private diagnosisServiceCache: DiagnosisDataServiceCache,
        private userRouterService: UserRouterService
    ) {
    }

    ngOnInit(): void {
        this.initData();
    }

    private initData() {
        this.diagnosisTask = <DiagnosisHealthcheckTask>this.healthcheckRouterService.getCurrentTask();
        this.diagnosis = this.diagnosisServiceCache.getFlat()
            .find(diagnosis => diagnosis.id === this.diagnosisTask.diagnosisId);
    }

    public endHealthcheck() {
        this.userRouterService.saveUserHealthcheck();
    }
}
