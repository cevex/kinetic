import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderModule } from '~/app/modules/components/users/header/user-header.module';
import { ConsultComponent } from './consult.component';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';


@NgModule({
    declarations: [
        ConsultComponent
    ],
    exports: [
        ConsultComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
        UserHeaderModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ConsultModule {
}
