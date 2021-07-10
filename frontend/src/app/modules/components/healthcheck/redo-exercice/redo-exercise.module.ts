import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedoExerciseComponent } from './redo-exercise.component';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';

@NgModule({
    declarations: [
        RedoExerciseComponent
    ],
    exports: [
        RedoExerciseComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class RedoExerciseModule {
}
