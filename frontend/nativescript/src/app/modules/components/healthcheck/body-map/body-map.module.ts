import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TNSImageModule } from '@nativescript-community/ui-image/angular';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';
import { BodyMapComponent } from './body-map.component';

@NgModule({
    declarations: [
        BodyMapComponent
    ],
    exports: [
        BodyMapComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
        TNSImageModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class BodyMapModule {
}
