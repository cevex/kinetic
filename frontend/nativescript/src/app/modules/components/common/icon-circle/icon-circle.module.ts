import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';
import { IconCircleComponent } from './icon-circle.component';

@NgModule({
    declarations: [
        IconCircleComponent
    ],
    exports: [
        IconCircleComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptCommonModule,
        CommonModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class IconCircleModule {
}
