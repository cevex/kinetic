import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderModule } from '~/app/modules/components/users/header/user-header.module';
import { BodyMapModule } from '../body-map/body-map.module';
import { PainAssessmentComponent } from './pain-assessment.component';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';

@NgModule({
    declarations: [
        PainAssessmentComponent
    ],
    exports: [
        PainAssessmentComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
        BodyMapModule,
        UserHeaderModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PainAssessmentModule {
}
