import { Component, OnInit } from '@angular/core';
import * as app from '@nativescript/core/application';
import { RepositoryService } from '~/app/modules/core/domain/repository.service';
import { AppRouterService } from '~/app/modules/core/router/app-router.service';

@Component({
    selector: 'ns-app',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    constructor(
        private appRouterService: AppRouterService,
        private repositoryService: RepositoryService,
    ) {
    }

    ngOnInit(): void {
        this.repositoryService.init();
        this.handleBackNavigation();
    }


    private handleBackNavigation() {
        if (app.android) {
            app.android.on(app.AndroidApplication.activityBackPressedEvent,
                (args: any) => this.backEvent(args));
        }
    }

    backEvent(args) {
        args.cancel = true;
        console.log('Cancel back :-) ');
    }
}
