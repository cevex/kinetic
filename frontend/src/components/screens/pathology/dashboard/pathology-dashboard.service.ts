import { cloneDeep } from 'lodash-es';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
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

    // =======================================================================
    //               Sessions
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
        const newState = cloneDeep(currentState);
        // const currentPhase = PathologyPhaseDataService.findTodayPhase(pathology.phases);
        // const currentSession = PathologySessionDataService.findTodaySession(currentPhase.sessions);
        newState.pathologyPhase = PathologyPhasesElementService.mapPathologyPhase(
            treatmentArea,
            currentState.currentPhase,
            currentState.currentSession,
            !PathologyPhaseDataService.isFirstPhase(pathology.phases, currentState.currentPhase),
            !PathologyPhaseDataService.isLastPhase(pathology.phases, currentState.currentPhase)
        );
        return newState;
    }

    public static goNextPhase(
        currentState: PathologyDashboardState,
        treatmentArea: TreatmentArea,
        pathology: Pathology
    ): PathologyDashboardState {
        const newState = cloneDeep(currentState);
        // Data
        newState.currentPhase = PathologyPhaseDataService.findNextPhase(
            pathology.phases,
            currentState.currentPhase
        );
        newState.currentSession = newState.currentPhase.sessions[0];
        // Element
        newState.pathologyPhase = PathologyPhasesElementService.mapPathologyPhase(
            treatmentArea,
            newState.currentPhase,
            newState.currentSession,
            !PathologyPhaseDataService.isFirstPhase(pathology.phases, newState.currentPhase),
            !PathologyPhaseDataService.isLastPhase(pathology.phases, newState.currentPhase)
        );
        return newState;
    }

    public static goPreviousPhase(
        currentState: PathologyDashboardState,
        treatmentArea: TreatmentArea,
        pathology: Pathology
    ): PathologyDashboardState {
        const newState = cloneDeep(currentState);
        newState.currentPhase = PathologyPhaseDataService.findPreviousPhase(
            pathology.phases,
            currentState.currentPhase
        );
        newState.currentSession = newState.currentPhase.sessions[0];
        newState.pathologyPhase = PathologyPhasesElementService.mapPathologyPhase(
            treatmentArea,
            newState.currentPhase,
            newState.currentSession,
            !PathologyPhaseDataService.isFirstPhase(pathology.phases, newState.currentPhase),
            !PathologyPhaseDataService.isLastPhase(pathology.phases, newState.currentPhase)
        );
        return newState;
    }

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

    public static selectExercise(
        pathologyDashboard: PathologyDashboardState,
        exercise: Exercise
    ): PathologyDashboardState {
        const newState = cloneDeep(pathologyDashboard);
        return newState;
    }

    public static showEvaluation(
        pathologyDashboard: PathologyDashboardState
    ): PathologyDashboardState {
        const newState = cloneDeep(pathologyDashboard);
        newState.showEvaluation = true;
        return newState;
    }

    public static setEvaluation(
        pathologyDashboard: PathologyDashboardState
    ): PathologyDashboardState {
        const newState = cloneDeep(pathologyDashboard);
        newState.showEvaluation = true;
        return newState;
    }
}
