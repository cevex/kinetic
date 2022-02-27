import { UiItem } from '../../../ui/core/ui-item.model';
import { PathologySessionElement } from '../session/pathology-session-element.model';

export interface PathologyPhaseElement {
    phaseName: string;
    hasNext: boolean;
    hasPrevious: boolean;

    sessions: UiItem[];
    selectedSession: string;

    sessionElement: PathologySessionElement;
}
