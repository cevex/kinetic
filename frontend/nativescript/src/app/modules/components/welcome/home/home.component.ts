import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserRouterService } from '~/app/modules/core/router/user-router.service';
import { KineticStoreService } from '~/app/modules/core/store/kinetic-store.service';
import { AppRouterService } from '../../../core/router/app-router.service';

@Component({
    selector: 'knt-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    public loadingApp = true;

    constructor(
        private cdr: ChangeDetectorRef,
        private appRouterService: AppRouterService,
        private userRouterService: UserRouterService,
        private storeService: KineticStoreService
    ) {
    }

    ngOnInit() {
        this.storeService.load().subscribe(store => {
            console.log('[store] Loaded !', store);

            this.appRouterService.rootApp();
            this.loadingApp = false;
            this.cdr.detectChanges();
        });
    }

    private showWelcome() {

    }

    private showUserHome() {

    }

    startHealthcheck() {
        this.userRouterService.goToUserProfile();
    }
}

