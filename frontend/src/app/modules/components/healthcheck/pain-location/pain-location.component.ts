import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core';
import { BodyAreaDataServiceCache } from '~/app/modules/core/domain/body/body-area-data.service.cache';
import { HealthcheckRouterService } from '~/app/modules/core/router/healthcheck-router.service';
import { BodyArea } from '../../../core/domain/body/body-area-data.model';
import { TestLocationHealthcheckTask } from '../../../core/domain/healthcheck-task/specific/test-location-healthcheck-task.model';

@Component({
    selector: 'knt-pain-location',
    templateUrl: './pain-location.component.html',
    styleUrls: ['./pain-location.component.scss']
})
export class PainLocationComponent implements OnInit {

    public testLocationTask: TestLocationHealthcheckTask;
    public bodyAreas: BodyArea[];

    constructor(
        private bodyAreaService: BodyAreaDataServiceCache,
        private healthcheckRouterService: HealthcheckRouterService
    ) {
    }

    ngOnInit(): void {
        this.initData();
    }

    private initData() {
        this.testLocationTask = <TestLocationHealthcheckTask>this.healthcheckRouterService.getCurrentTask();
        this.initChoices();
    }

    public chooseLocation(bodyAreaChoice: BodyArea, navigate?: boolean) {
        const choice = this.testLocationTask.painChoices.find(choice => choice.bodyArea === bodyAreaChoice.type);
        this.healthcheckRouterService.chooseLocation(choice);
        if (!navigate) this.checkForChange();
    }

    public initChoices() {
        const bodyAreasTypes = this.testLocationTask.painChoices.map(choice => choice.bodyArea);
        this.bodyAreas = this.bodyAreaService.getFlat()
            .filter(bodyArea => bodyAreasTypes.includes(bodyArea.type));
    }

    public checkForChange() {
        setTimeout(() => this.initData());
    }
}
