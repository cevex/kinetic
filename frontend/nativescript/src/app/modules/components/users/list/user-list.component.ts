import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '~/app/modules/core/domain/user/user.model';
import { UsersDataService } from '~/app/modules/core/domain/user/users-data.service';
import { UserRouterService } from '~/app/modules/core/router/user-router.service';
import { KineticStoreService } from '~/app/modules/core/store/kinetic-store.service';

@Component({
    selector: 'knt-gender',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

    public users: User[];

    constructor(
        private store: KineticStoreService,
        private usersDataService: UsersDataService,
        private userRouterService: UserRouterService
    ) {
    }

    ngOnInit(): void {
        this.users = this.usersDataService.retrieveUsers();
    }

    public addUser() {
        this.userRouterService.goToUserProfile();
    }

    public selectUser(user: User) {
        this.userRouterService.selectUser(user);
        // this.userRouterService.goToUserHome();
    }
}
