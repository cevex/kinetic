import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';
import { UserHeaderModule } from '~/app/modules/components/users/header/user-header.module';
import { ExerciseComponent } from './exercise.component';

@NgModule({
    declarations: [
        ExerciseComponent
    ],
    exports: [
        ExerciseComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
        UserHeaderModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ExerciseModule {
}
