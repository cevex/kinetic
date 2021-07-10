import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PainAssessmentModule {
}
