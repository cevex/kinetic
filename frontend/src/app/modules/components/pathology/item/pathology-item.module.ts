import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TNSImageModule } from '@nativescript-community/ui-image/angular';
import { PathologyItemComponent } from './pathology-item.component';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';

@NgModule({
    declarations: [
        PathologyItemComponent
    ],
    exports: [
        PathologyItemComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
        TNSImageModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PathologyItemModule {
}
