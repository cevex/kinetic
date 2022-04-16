import { SelectProgressItem } from '../../../ui/form/selects/progress/select-progress.component';
import { PathologySessionElement } from '../session/pathology-session-element.model';

export interface PathologyPhaseElement {
    phaseName: string;
    hasNext: boolean;
    hasPrevious: boolean;

    sessions: SelectProgressItem[];
    selectedSession: string;

    sessionElement: PathologySessionElement;
}
