import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { UiItem } from '../../../ui/core/ui-item.model';
import { PathologySessionState } from '../session/pathology-session.model';

export declare type DashboardMode = 'phase' | 'video-library';

export interface PathologyDashboardState {
    dashboardModeOptions: UiItem[];
    selectedDashboardMode: UiItem;

    session?: PathologySessionState;
    videoLibrary?: Exercise[];
}
