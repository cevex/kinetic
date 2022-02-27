import { cloneDeep } from 'lodash-es';
import { Pathology } from '../../../../core/domain/pathology/pathology.model';
import { PathologyPhaseDataService } from '../../../../core/domain/pathology/phase/pathology-phase-data.service';
import { PathologySessionDataService } from '../../../../core/domain/pathology/session/pathology-session-data.service';
import { TreatmentArea } from '../../../../core/domain/treatment-area/treatment-area.model';
import { UiItem } from '../../../ui/core/ui-item.model';
import { PathologyPhasesElementService } from '../phases/pathology-phases-element.service';
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
        treatmentArea: TreatmentArea,
        pathology: Pathology,
        dashboardMode: DashboardMode
    ): PathologyDashboardState {
        console.log('[PathologyDashboard] pathology', pathology);

        const currentPhase = PathologyPhaseDataService.findTodayPhase(pathology.phases);
        const currentSession = PathologySessionDataService.findTodaySession(currentPhase.sessions);

        return {
            // Data model
            currentPhase: currentPhase,
            currentSession: currentSession,

            // Element model
            dashboardTitle: treatmentArea.title,
            dashboardModeOptions: this.dashboardModeOptions,
            selectedDashboardMode: this.dashboardModeOptions.find(
                item => item.id === dashboardMode
            ),
            pathologyPhase: PathologyPhasesElementService.mapPathologyPhase(
                treatmentArea,
                currentPhase,
                currentSession,
                !PathologyPhaseDataService.isFirstPhase(pathology.phases, currentPhase),
                !PathologyPhaseDataService.isLastPhase(pathology.phases, currentPhase)
            )
        };
    }

    public static updateScreen(
        currentState: PathologyDashboardState,
        treatmentArea: TreatmentArea,
        pathology: Pathology
    ): PathologyDashboardState {
        const newState = cloneDeep(currentState);
        const currentPhase = PathologyPhaseDataService.findTodayPhase(pathology.phases);
        const currentSession = PathologySessionDataService.findTodaySession(currentPhase.sessions);
        newState.pathologyPhase = PathologyPhasesElementService.mapPathologyPhase(
            treatmentArea,
            currentPhase,
            currentSession,
            !PathologyPhaseDataService.isFirstPhase(pathology.phases, currentPhase),
            !PathologyPhaseDataService.isLastPhase(pathology.phases, currentPhase)
        );
        return newState;
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
