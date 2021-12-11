import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderModule } from '~/app/modules/components/users/header/user-header.module';
import { DiagnosisComponent } from './diagnosis.component';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';

@NgModule({
    declarations: [
        DiagnosisComponent
    ],
    exports: [
        DiagnosisComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
        UserHeaderModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class DiagnosisModule {
}
