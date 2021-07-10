import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';
import { BodyMapModule } from '../body-map/body-map.module';
import { PainLocationComponent } from './pain-location.component';

@NgModule({
    declarations: [
        PainLocationComponent
    ],
    exports: [
        PainLocationComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
        BodyMapModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PainLocationModule {
}
