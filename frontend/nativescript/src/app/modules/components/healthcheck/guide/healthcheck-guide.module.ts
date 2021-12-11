import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';
import { HealthcheckGuideComponent } from './healthcheck-guide.component';

@NgModule({
    declarations: [
        HealthcheckGuideComponent
    ],
    exports: [
        HealthcheckGuideComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HealthcheckGuideModule {
}
