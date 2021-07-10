import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';
import { IconCircleModule } from '~/app/modules/components/common/icon-circle/icon-circle.module';
import { PathologyListModule } from '~/app/modules/components/pathology/list/pathology-list.module';
import { UserHomeComponent } from './user-home.component';

@NgModule({
    declarations: [
        UserHomeComponent
    ],
    exports: [
        UserHomeComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
        IconCircleModule,
        PathologyListModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserHomeModule {
}
