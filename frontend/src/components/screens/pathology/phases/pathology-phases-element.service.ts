import { cloneDeep } from 'lodash-es';
import { DateTimeService } from '../../../../core/common/date-time.service';
import { PathologyEvaluationService } from '../../../../core/domain/pathology/evaluation/pathology-evaluation.service';
import { PathologyPhaseData } from '../../../../core/domain/pathology/phase/pathology-phase-data.model';
import { PathologySessionData } from '../../../../core/domain/pathology/session/pathology-session-data.model';
import { TreatmentArea } from '../../../../core/domain/treatment-area/treatment-area.model';
import { TreatmentPhase } from '../../../../core/domain/treatment/phase/treatment-phase.model';
import { TreatmentPhaseService } from '../../../../core/domain/treatment/phase/treatment-phase.service';
import { TreatmentService } from '../../../../core/domain/treatment/treatment.service';
import { SelectProgressItem } from '../../../ui/form/selects/progress/select-progress.component';
import { SelectProgressStatus } from '../../../ui/form/selects/progress/select-progress.service';
import { PathologyDashboardState } from '../dashboard/pathology-dashboard.model';
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
        const treatmentPhase = TreatmentPhaseService.getTreatmentPhasesById(
            currentPhase.treatmentPhase
        );
        const exercisesForPhases = TreatmentService.getExercisesForPhases(
            treatment,
            treatmentPhase.id
        );

        const sessionReadOnly = DateTimeService.isInFuture(new Date(currentSession.dateUTC));
        return {
            phaseName: this.getPhaseTitle(treatmentPhase, currentPhase, currentSession),
            hasPrevious: hasPrevious,
            hasNext: hasNext,

            sessions: this.getSessionItems(currentPhase.sessions),
            selectedSession: currentSession.dateUTC,

            sessionElement: PathologySessionElementService.mapPathologySession(
                currentSession,
                exercisesForPhases,
                sessionReadOnly
            )
        };
    }

    private static getPhaseTitle(
        treatmentPhase: TreatmentPhase,
        currentPhase: PathologyPhaseData,
        currentSession: PathologySessionData
    ): string {
        const currentSessionIndex = currentPhase.sessions.findIndex(session =>
            DateTimeService.equalsUTC(session.dateUTC, currentSession.dateUTC)
        );
        return (
            'Phase ' +
            treatmentPhase.name +
            '(Séance ' +
            (currentSessionIndex + 1) +
            '/' +
            currentPhase.sessions?.length +
            ')'
        );
    }

    private static getSessionItems(sessions: PathologySessionData[]): SelectProgressItem[] {
        return sessions.map((session, index) => {
            return {
                id: session.dateUTC,
                label: index + 1 + '',
                status: this.getSessionStatus(session),
                data: session
            };
        });
    }

    private static getSessionStatus(session: PathologySessionData): SelectProgressStatus {
        if (DateTimeService.isAfter(new Date(session.dateUTC), DateTimeService.getTodayStart())) {
            return 'empty';
        }
        if (DateTimeService.equals(new Date(session.dateUTC), DateTimeService.getTodayStart())) {
            return 'highlighted';
        }
        const hasDoneExercises = !!session.doneExercisesId?.length;
        const evaluationDone = PathologyEvaluationService.isEvaluationEmpty(session.evaluation);

        return hasDoneExercises && evaluationDone ? 'validated' : 'not-validated';
    }

    public static setEvaluation(
        pathologyDashboard: PathologyDashboardState
    ): PathologyDashboardState {
        const newState = cloneDeep(pathologyDashboard);
        newState.showEvaluation = true;
        return newState;
    }
}
