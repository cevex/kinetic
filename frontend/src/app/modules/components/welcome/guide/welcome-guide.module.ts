import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeGuideComponent } from './welcome-guide.component';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';


@NgModule({
    declarations: [
        WelcomeGuideComponent
    ],
    exports: [
        WelcomeGuideComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class WelcomeGuideModule {
}
