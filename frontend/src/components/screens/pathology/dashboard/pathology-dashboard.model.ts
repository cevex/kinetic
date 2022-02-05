import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { UiItem } from '../../../ui/core/ui-item.model';

export declare type DashboardMode = 'phase' | 'video-library';

export interface PathologyDashboardState {
    dashboardMode: UiItem[];
    selectedDashboardMode: UiItem;

    phases: string[];
    selectedPhase: string;

    phaseName: string;

    exercises: Exercise[];

    nbSession: number;
    currentSession: number;
}
