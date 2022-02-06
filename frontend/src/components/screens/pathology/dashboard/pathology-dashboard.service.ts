import { cloneDeep, first, last } from 'lodash-es';
import { Pathology } from '../../../../core/domain/pathology/pathology.model';
import { PathologyPhase } from '../../../../core/domain/pathology/phase/pathology-phase.model';
import { TreatmentPhase } from '../../../../core/domain/treatment/phase/treatment-phase.model';
import { TreatmentPhaseService } from '../../../../core/domain/treatment/phase/treatment-phase.service';
import { TreatmentService } from '../../../../core/domain/treatment/treatment.service';
import { UiItem } from '../../../ui/core/ui-item.model';
import { PathologySessionState } from '../session/pathology-session.model';
import { DashboardMode, PathologyDashboardState } from './pathology-dashboard.model';

export class PathologyDashboardService {
    private static dashboardModeOptions: UiItem[] = [
        {
            id: 'phase',
            label: 'Séance du jour'
        },
        {
            id: 'video-library',
            label: 'Vidéotheque'
        }
    ];

    public static initScreen(
        pathology: Pathology,
        dashboardMode: DashboardMode
    ): PathologyDashboardState {
        console.log('[PathologyDashboard] pathology', pathology);
        // const treatment = TreatmentService.getTreatmentForHealthcheck(
        //     pathology.originalHealthcheck
        // );
        return {
            dashboardModeOptions: this.dashboardModeOptions,
            selectedDashboardMode: this.dashboardModeOptions.find(item => item.id === dashboardMode)
            // session: this.initCurrentSession(pathology.phases, treatment.phases),
            // videoLibrary: TreatmentPhaseService.flattenExercises(treatment.phases)
        };
    }

    public static initCurrentSession(
        pathologyPhases: PathologyPhase[],
        treatmentPhases: TreatmentPhase[]
    ): PathologySessionState {
        const pathologyPhase = <PathologyPhase>first(pathologyPhases);
        const treatmentPhase = <TreatmentPhase>first(treatmentPhases); // Find current

        const currentSession = last(pathologyPhase.sessions);
        const nbSessions = treatmentPhase.duration;
        const currentSessionNb = pathologyPhases.length;
        return {
            nbSession: nbSessions,
            currentSession: currentSessionNb,

            phaseName: treatmentPhase.name,
            sessions: this.getPhaseItems(pathologyPhases),
            selectedSession: pathologyPhase.treatmentPhase + '',

            exercises: treatmentPhase.exercises,
            selectedExercises: currentSession.doneExercisesId
        };
    }

    private static getPhaseItems(pathologyPhases: PathologyPhase[]): UiItem[] {
        return pathologyPhases.map((pathologyPhase, index) => {
            return {
                id: pathologyPhase.treatmentPhase,
                label: index + ''
            };
        });
    }

    public static setDashboardMode(
        pathologyDashboard: PathologyDashboardState,
        dashboardMode: DashboardMode
    ): PathologyDashboardState {
        const newState = cloneDeep(pathologyDashboard);
        newState.selectedDashboardMode = this.dashboardModeOptions.find(
            item => item.id === dashboardMode
        );
        return newState;
    }
}
