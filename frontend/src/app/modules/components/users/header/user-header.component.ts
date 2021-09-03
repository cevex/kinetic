import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppRouterService } from '~/app/modules/core/router/app-router.service';
import { BodyArea } from '../../../core/domain/body/body-area-data.model';
import { User } from '../../../core/domain/user/user.model';
import { UsersDataService } from '../../../core/domain/user/users-data.service';
import { UserRouterService } from '../../../core/router/user-router.service';
import { KineticStoreService } from '../../../core/store/kinetic-store.service';

@Component({
    selector: 'knt-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHeaderComponent implements OnInit {

    @Input() title: string;
    @Input() icon: string;
    @Output() iconClicked = new EventEmitter<BodyArea>();

    public user: User;

    constructor(
        private store: KineticStoreService,
        private usersDataService: UsersDataService,
        private userRouterService: UserRouterService,
        private appRouterService: AppRouterService
    ) {
    }

    ngOnInit(): void {
        this.user = this.store.getSelectedUser();
    }

    public goToUserList() {
        this.userRouterService.unselectUser();
    }

    public selectUser(user: User) {
        this.userRouterService.selectUser(user);
        // this.userRouterService.goToUserHome();
    }

    public getIcon(): string {
        return '&#' + this.icon + ';';
    }
}
