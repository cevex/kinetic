import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BodyArea } from '~/app/modules/core/domain/body/body-area-data.model';
import { DiagnosisDataServiceCache } from '~/app/modules/core/domain/diagnosis/diagnosis-data.service.cache';
import { HealthcheckRouterService } from '~/app/modules/core/router/healthcheck-router.service';
import { UserRouterService } from '~/app/modules/core/router/user-router.service';
import { Diagnosis } from '../../../core/domain/diagnosis/diagnosis.model';
import { DiagnosisHealthcheckTask } from '../../../core/domain/healthcheck-task/specific/diagnosis-healthcheck-task.model';
import { HealthcheckDataService } from '../../../core/domain/healthcheck/healthcheck-data.service';

@Component({
    selector: 'knt-diagnosis',
    templateUrl: './diagnosis.component.html',
    styleUrls: ['./diagnosis.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiagnosisComponent implements OnInit {

    public diagnosisTask: DiagnosisHealthcheckTask;
    public diagnosis: Diagnosis;
    public bodyArea: BodyArea;

    constructor(
        private treatmentDataService: HealthcheckDataService,
        private diagnosisServiceCache: DiagnosisDataServiceCache,
        private healthcheckRouterService: HealthcheckRouterService,
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
        this.bodyArea = this.healthcheckRouterService.getBodyArea();
    }

    public endHealthcheck() {
        this.userRouterService.saveUserHealthcheck();
    }
}
