import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { UserRouterService } from '~/app/modules/core/router/user-router.service';
import { KineticStoreService } from '~/app/modules/core/store/kinetic-store.service';

@Injectable({
    providedIn: 'root'
})
export class AppRouterService {

    public static APP_ROOT = {
        landing: 'landing'
    };

    constructor(
        private http: HttpClient,
        private routerExtensions: RouterExtensions,
        private userRouterService: UserRouterService,
        private storeService: KineticStoreService
    ) {
    }

    public rootApp() {
        const store = this.storeService.getStore();
        if (store.selectedUser) {
            this.userRouterService.rootHome(store.selectedUser);
        }
        if (store.users && store.users.length) {
            this.userRouterService.goToUserList();
        }
        // stay on landing page
    }
}
