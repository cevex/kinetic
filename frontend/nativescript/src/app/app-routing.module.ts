import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { ConsultComponent } from '~/app/modules/components/healthcheck/consult/consult.component';
import { DiagnosisComponent } from '~/app/modules/components/healthcheck/diagnosis/diagnosis.component';
import { ExerciseComponent } from '~/app/modules/components/healthcheck/exercice/exercise.component';
import { HealthcheckGuideComponent } from '~/app/modules/components/healthcheck/guide/healthcheck-guide.component';
import { PainAssessmentComponent } from '~/app/modules/components/healthcheck/pain-assessment/pain-assessment.component';
import { PainLocationComponent } from '~/app/modules/components/healthcheck/pain-location/pain-location.component';
import { RedoExerciseComponent } from '~/app/modules/components/healthcheck/redo-exercice/redo-exercise.component';
import { UserFormComponent } from '~/app/modules/components/users/form/user-form.component';
import { UserHomeComponent } from '~/app/modules/components/users/home/user-home.component';
import { UserListComponent } from '~/app/modules/components/users/list/user-list.component';

import { HomeComponent } from '~/app/modules/components/welcome/home/home.component';
import { AppRouterService } from '~/app/modules/core/router/app-router.service';
import { HealthcheckRouterService } from '~/app/modules/core/router/healthcheck-router.service';
import { UserRouterService } from '~/app/modules/core/router/user-router.service';

const routes: Routes = [
    {path: '', redirectTo: AppRouterService.APP_ROOT.landing, pathMatch: 'full'},
    // {path: '', redirectTo: HealthcheckRouterService.HEALTHCHECK_ROOT.painAssessment, pathMatch: 'full'},

    // ===============    App   =============
    {path: AppRouterService.APP_ROOT.landing, component: HomeComponent},

    // ===============    Users   =============
    {path: UserRouterService.USER_ROOT.list, component: UserListComponent},
    {path: UserRouterService.USER_ROOT.home, component: UserHomeComponent},
    {path: UserRouterService.USER_ROOT.profile, component: UserFormComponent},

    // ===============  HealthCheck =============
    {path: HealthcheckRouterService.HEALTHCHECK_ROOT.guide, component: HealthcheckGuideComponent},
    {path: HealthcheckRouterService.HEALTHCHECK_ROOT.painAssessment, component: PainAssessmentComponent},
    {path: HealthcheckRouterService.HEALTHCHECK_ROOT.painLocation, component: PainLocationComponent},
    {path: HealthcheckRouterService.HEALTHCHECK_ROOT.exercise, component: ExerciseComponent},
    {path: HealthcheckRouterService.HEALTHCHECK_ROOT.redoExercise, component: RedoExerciseComponent},
    {path: HealthcheckRouterService.HEALTHCHECK_ROOT.diagnosis, component: DiagnosisComponent},
    {path: HealthcheckRouterService.HEALTHCHECK_ROOT.consult, component: ConsultComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {
}
