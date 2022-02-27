import { PathologyPhaseData } from '../../../../core/domain/pathology/phase/pathology-phase-data.model';
import { PathologySessionData } from '../../../../core/domain/pathology/session/pathology-session-data.model';
import { TreatmentArea } from '../../../../core/domain/treatment-area/treatment-area.model';
import { TreatmentService } from '../../../../core/domain/treatment/treatment.service';
import { UiItem } from '../../../ui/core/ui-item.model';
import { PathologySessionElementService } from '../session/pathology-session-element.service';
import { PathologyPhaseElement } from './pathology-phases-element.model';

export class PathologyPhasesElementService {
    public static mapPathologyPhase(
        treatmentArea: TreatmentArea,
        currentPhase: PathologyPhaseData,
        currentSession: PathologySessionData,
        hasPrevious: boolean,
        hasNext: boolean
    ): PathologyPhaseElement {
        const treatment = TreatmentService.getTreatmentByArea(treatmentArea.id);
        const exercisesForPhases = TreatmentService.getExercisesForPhases(
            treatment,
            currentPhase.treatmentPhase
        );
        return {
            phaseName: treatment.area.name,
            hasPrevious: hasPrevious,
            hasNext: hasNext,

            sessions: this.getSessionItems(currentPhase.sessions),
            selectedSession: currentSession.date.toString(),

            sessionElement: PathologySessionElementService.mapPathologySession(
                currentSession,
                exercisesForPhases
            )
        };
    }

    private static getSessionItems(sessions: PathologySessionData[]): UiItem[] {
        return sessions.map((session, index) => {
            return {
                id: session.date.toString(),
                label: index + '',
                data: session
            };
        });
    }
}
