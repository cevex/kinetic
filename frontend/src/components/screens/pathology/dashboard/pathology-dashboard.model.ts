import { PathologyPhaseData } from '../../../../core/domain/pathology/phase/pathology-phase-data.model';
import { PathologySessionData } from '../../../../core/domain/pathology/session/pathology-session-data.model';
import { UiItem } from '../../../ui/core/ui-item.model';
import { PathologyPhaseElement } from '../phases/pathology-phases-element.model';

export declare type DashboardMode = 'phase' | 'video-library';

export interface PathologyDashboardState {
    showEvaluation: boolean;

    // Data model
    currentPhase: PathologyPhaseData;
    currentSession: PathologySessionData;

    // Element model
    dashboardTitle: string;
    dashboardModeOptions: UiItem[];
    selectedDashboardMode: UiItem;
    pathologyPhase: PathologyPhaseElement;
}
