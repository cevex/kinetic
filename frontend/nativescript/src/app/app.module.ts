import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import * as imageModule from '@nativescript-community/ui-image';
import { NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import * as applicationModule from '@nativescript/core/application';
import { ConsultModule } from '~/app/modules/components/healthcheck/consult/consult.module';
import { DiagnosisModule } from '~/app/modules/components/healthcheck/diagnosis/diagnosis.module';
import { ExerciseModule } from '~/app/modules/components/healthcheck/exercice/exercise.module';
import { HealthcheckGuideModule } from '~/app/modules/components/healthcheck/guide/healthcheck-guide.module';
import { PainAssessmentModule } from '~/app/modules/components/healthcheck/pain-assessment/pain-assessment.module';
import { PainLocationModule } from '~/app/modules/components/healthcheck/pain-location/pain-location.module';
import { RedoExerciseModule } from '~/app/modules/components/healthcheck/redo-exercice/redo-exercise.module';
import { UserFormModule } from '~/app/modules/components/users/form/user-form.module';
import { UserHomeModule } from '~/app/modules/components/users/home/user-home.module';
import { UserListModule } from '~/app/modules/components/users/list/user-list.module';
import { WelcomeGuideModule } from '~/app/modules/components/welcome/guide/welcome-guide.module';
import { HomeModule } from '~/app/modules/components/welcome/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Init Image Module
if (applicationModule.android) {
    applicationModule.on(applicationModule.launchEvent, () => {
        imageModule.initialize();
    });
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        HomeModule,
        WelcomeGuideModule,

        // User
        UserFormModule,
        UserHomeModule,
        UserListModule,

        // Pathology

        // Healthcheck
        HealthcheckGuideModule,
        ConsultModule,
        DiagnosisModule,
        ExerciseModule,
        PainAssessmentModule,
        PainLocationModule,
        RedoExerciseModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
}
