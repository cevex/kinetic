import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';
import { IconCircleModule } from '~/app/modules/components/common/icon-circle/icon-circle.module';
import { UserFormComponent } from './user-form.component';

@NgModule({
    declarations: [
        UserFormComponent
    ],
    exports: [
        UserFormComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptCommonModule,
        IconCircleModule,

    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserFormModule {
}
