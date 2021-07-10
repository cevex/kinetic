import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TextField } from '@nativescript/core';
import { Gender, UserProfile } from '~/app/modules/core/domain/user/user.model';
import { UsersDataService } from '~/app/modules/core/domain/user/users-data.service';
import { UserRouterService } from '~/app/modules/core/router/user-router.service';
import { KineticStoreService } from '~/app/modules/core/store/kinetic-store.service';

@Component({
    selector: 'knt-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {

    public userProfile: UserProfile;
    public creationMode: boolean;
    public formValid: boolean;

    constructor(
        private cdr: ChangeDetectorRef,
        private store: KineticStoreService,
        private usersDataService: UsersDataService,
        private userRouterService: UserRouterService
    ) {
    }

    ngOnInit(): void {
        this.initData();
    }

    // =======================================================================
    //                Init
    // =======================================================================

    public initData() {
        const selectedUser = this.store.getSelectedUser();
        this.creationMode = !selectedUser;
        this.userProfile = !this.creationMode ?
            selectedUser.userProfile :
            this.usersDataService.getDefaultProfile();
    }

    // =======================================================================
    //                Update
    // =======================================================================

    public updateName($event: any) {
        let textField = <TextField>$event.object;
        this.userProfile.name = textField.text;
        this.validateForm();
    }

    public selectGender(gender: Gender) {
        this.userProfile.gender = gender;
        this.validateForm();
    }

    private validateForm() {
        this.formValid = !!this.userProfile.name &&
            !!this.userProfile.gender;
        this.cdr.detectChanges();
    }

    // =======================================================================
    //                Actions
    // =======================================================================

    public delete() {
        this.userRouterService.deleteUser(this.store.getSelectedUser());
    }

    public update() {
        this.userRouterService.updateUser(this.userProfile);
    }

    public create() {
        this.userRouterService.createUser(this.userProfile);
    }

    public cancel() {
        this.creationMode ?
            this.userRouterService.goToUserList() :
            this.userRouterService.rootHome(this.store.getSelectedUser());

    }
}
