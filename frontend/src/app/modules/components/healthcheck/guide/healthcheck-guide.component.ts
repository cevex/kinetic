import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EventData, Switch } from '@nativescript/core';
import { HealthcheckRouterService } from '../../../core/router/healthcheck-router.service';

@Component({
    selector: 'knt-treatment-guide',
    templateUrl: './healthcheck-guide.component.html',
    styleUrls: ['./healthcheck-guide.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthcheckGuideComponent implements OnInit {

    constructor(
        private healthcheckRouterService: HealthcheckRouterService
    ) {
    }

    ngOnInit(): void {
    }

    public stopDisplay(args: EventData) {
        let sw = args.object as Switch;
        console.log('[treatment-guide] stopDisplay', sw.checked);
    }

    public goNext() {
        this.healthcheckRouterService.seeHealthcheckGuide();
    }
}
