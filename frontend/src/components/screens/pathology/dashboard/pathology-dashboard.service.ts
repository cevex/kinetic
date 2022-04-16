import { cloneDeep } from 'lodash-es';
import { Pathology } from '../../../../core/domain/pathology/pathology.model';
import { PathologyPhaseData } from '../../../../core/domain/pathology/phase/pathology-phase-data.model';
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

    // =======================================================================
    //               SCREEN
    // =======================================================================

    public static initScreen(
        treatmentArea: TreatmentArea,
        pathology: Pathology,
        dashboardMode: DashboardMode
    ): PathologyDashboardState {
        const currentPhase = PathologyPhaseDataService.findTodayPhase(pathology.phases);
        const currentSession = PathologySessionDataService.findTodaySession(currentPhase.sessions);

        return {
            showEvaluation: false,

            // Data model
            currentPhase: currentPhase,
            currentSession: currentSession,

            // Element model
            dashboardTitle: treatmentArea.name,
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
        const currentPhase = PathologyPhaseDataService.findTodayPhase(pathology.phases);
        const currentSession = PathologySessionDataService.findTodaySession(currentPhase.sessions);
        const pathologyPhase = PathologyPhasesElementService.mapPathologyPhase(
            treatmentArea,
            currentState.currentPhase,
            currentState.currentSession,
            !PathologyPhaseDataService.isFirstPhase(pathology.phases, currentState.currentPhase),
            !PathologyPhaseDataService.isLastPhase(pathology.phases, currentState.currentPhase)
        );
        return {
            ...currentState,
            currentPhase,
            currentSession,
            pathologyPhase
        };
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

    // =======================================================================
    //               Phases
    // =======================================================================

    public static goNextPhase(
        currentState: PathologyDashboardState,
        treatmentArea: TreatmentArea,
        pathology: Pathology
    ): PathologyDashboardState {
        const newPhase = PathologyPhaseDataService.findNextPhase(
            pathology.phases,
            currentState.currentPhase
        );
        return this.setPhase(currentState, newPhase, treatmentArea, pathology);
    }

    public static goPreviousPhase(
        currentState: PathologyDashboardState,
        treatmentArea: TreatmentArea,
        pathology: Pathology
    ): PathologyDashboardState {
        const newPhase = PathologyPhaseDataService.findPreviousPhase(
            pathology.phases,
            currentState.currentPhase
        );
        return this.setPhase(currentState, newPhase, treatmentArea, pathology);
    }

    private static setPhase(
        currentState: PathologyDashboardState,
        newPhase: PathologyPhaseData,
        treatmentArea: TreatmentArea,
        pathology: Pathology
    ): PathologyDashboardState {
        const newSession = newPhase.sessions[0];
        const pathologyPhase = PathologyPhasesElementService.mapPathologyPhase(
            treatmentArea,
            newPhase,
            newSession,
            !PathologyPhaseDataService.isFirstPhase(pathology.phases, newPhase),
            !PathologyPhaseDataService.isLastPhase(pathology.phases, newPhase)
        );
        return {
            ...currentState,
            currentPhase: newPhase,
            currentSession: newSession,
            pathologyPhase
        };
    }

    // =======================================================================
    //               Sessions
    // =======================================================================

    public static goToSession(
        currentState: PathologyDashboardState,
        sessionIndex: number,
        treatmentArea: TreatmentArea,
        pathology: Pathology
    ): PathologyDashboardState {
        const newState = cloneDeep(currentState);
        newState.currentSession = newState.currentPhase.sessions[sessionIndex];
        newState.pathologyPhase = PathologyPhasesElementService.mapPathologyPhase(
            treatmentArea,
            newState.currentPhase,
            newState.currentSession,
            !PathologyPhaseDataService.isFirstPhase(pathology.phases, newState.currentPhase),
            !PathologyPhaseDataService.isLastPhase(pathology.phases, newState.currentPhase)
        );
        return newState;
    }

    public static showEvaluation(
        pathologyDashboard: PathologyDashboardState
    ): PathologyDashboardState {
        return { ...pathologyDashboard, showEvaluation: true };
    }

    public static hideEvaluation(
        pathologyDashboard: PathologyDashboardState
    ): PathologyDashboardState {
        return { ...pathologyDashboard, showEvaluation: false };
    }
}
