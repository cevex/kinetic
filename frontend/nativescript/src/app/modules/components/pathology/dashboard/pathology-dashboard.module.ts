import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathologyDashboardComponent } from './pathology-dashboard.component';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';

@NgModule({
    declarations: [
        PathologyDashboardComponent
    ],
    exports: [
        PathologyDashboardComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PathologyDashboardModule {
}
