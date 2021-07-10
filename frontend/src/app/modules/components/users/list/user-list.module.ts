import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';
import { IconCircleModule } from '~/app/modules/components/common/icon-circle/icon-circle.module';
import { UserListComponent } from './user-list.component';

@NgModule({
    declarations: [
        UserListComponent
    ],
    exports: [
        UserListComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,

        IconCircleModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserListModule {
}
