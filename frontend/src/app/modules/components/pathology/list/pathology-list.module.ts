import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathologyItemModule } from '~/app/modules/components/pathology/item/pathology-item.module';
import { PathologyListComponent } from './pathology-list.component';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';

@NgModule({
    declarations: [
        PathologyListComponent
    ],
    exports: [
        PathologyListComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
        PathologyItemModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PathologyListModule {
}
