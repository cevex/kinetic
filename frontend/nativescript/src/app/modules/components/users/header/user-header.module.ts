import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';
import { IconCircleModule } from '../../common/icon-circle/icon-circle.module';
import { UserHeaderComponent } from './user-header.component';

@NgModule({
    declarations: [
        UserHeaderComponent
    ],
    exports: [
        UserHeaderComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,

        IconCircleModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserHeaderModule {
}
