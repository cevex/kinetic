import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Pathology } from '~/app/modules/core/domain/pathology/pathology.model';
import { PathologyService } from '~/app/modules/core/domain/pathology/pathology.service';
import { User } from '~/app/modules/core/domain/user/user.model';
import { UsersDataService } from '~/app/modules/core/domain/user/users-data.service';
import { UserRouterService } from '~/app/modules/core/router/user-router.service';
import { KineticStoreService } from '~/app/modules/core/store/kinetic-store.service';

@Component({
    selector: 'knt-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHomeComponent implements OnInit {

    public user: User;
    public pathologies: Pathology[];

    constructor(
        private storeService: KineticStoreService,
        private userDataService: UsersDataService,
        private userRouterService: UserRouterService,
        private pathologyService: PathologyService
    ) {
    }

    ngOnInit(): void {
        this.user = this.storeService.getSelectedUser();
        this.pathologies = this.pathologyService.getPathologies(this.user);

        console.log('[user-home] - LOAD user', this.user);
        console.log('[user-home] - LOAD pathologies', this.pathologies);
    }

    public editUser() {
        this.userRouterService.goToUserProfile();
    }

    public goToUserList() {
        this.userRouterService.unselectUser();
    }
}
