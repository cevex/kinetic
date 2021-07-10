import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ConsultModule {
}
