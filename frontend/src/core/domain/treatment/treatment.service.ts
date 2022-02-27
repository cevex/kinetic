import { groupBy } from 'lodash-es';
import treatmentDataJson from '../../../assets/data/treatment.data.json';
import { Exercise } from '../exercices/exercise.model';
import { ExercisesService } from '../exercices/exercises.service';
import { Healthcheck } from '../healthcheck/healthcheck.model';
import { HealthcheckService } from '../healthcheck/healthcheck.service';
import { TreatmentAreaDataService } from '../treatment-area/treatment-area.service';
import { TreatmentPhaseType } from './phase/treatment-phase.model';
import { TreatmentPhaseService } from './phase/treatment-phase.service';
import { Treatment, TreatmentPhaseWorkList } from './treatment.model';

interface TreatmentData {
    area: string;
    exercise: string;
    phases: string;
}

export class TreatmentService {
    // =======================================================================
    //                Getter
    // =======================================================================

    public static getTreatments(): Treatment[] {
        return this.mapTreatment(this.loadTreatments());
    }

    public static getTreatmentByArea(areaId: string): Treatment {
        return this.getTreatments().find(treatment => treatment.area.id === areaId);
    }

    public static getTreatmentForHealthcheck(healthcheck: Healthcheck): Treatment {
        const treatmentArea = HealthcheckService.getTreatmentArea(healthcheck);
        return TreatmentService.getTreatmentByArea(treatmentArea.id);
    }

    public static loadTreatments(): TreatmentData[] {
        return treatmentDataJson as TreatmentData[];
    }

    // =======================================================================
    //                Mapper
    // =======================================================================

    private static mapTreatment(treatmentsData: TreatmentData[]): Treatment[] {
        const groupByArea = groupBy(treatmentsData, 'area');
        return Object.keys(groupByArea).map((treatmentAreaId: string) => {
            const treatmentArea = TreatmentAreaDataService.getTreatmentAreasById(treatmentAreaId);
            return <Treatment>{
                area: treatmentArea,
                phasesWorkList: this.mapPhasesForArea(<TreatmentData[]>groupByArea[treatmentAreaId])
            };
        });
    }

    private static mapPhasesForArea(treatmentsData: TreatmentData[]): TreatmentPhaseWorkList[] {
        return TreatmentPhaseService.getTreatmentPhases().map(phase => {
            const treatmentForPhase = treatmentsData.filter(treatmentData =>
                treatmentData.phases.includes(phase.id)
            );
            return {
                phase: phase,
                exercisesId: treatmentForPhase.map(treatment => treatment.exercise)
            };
        });
    }

    // =======================================================================
    //                Exercises
    // =======================================================================

    public static getExercisesForPhases(
        treatment: Treatment,
        currentPhase: TreatmentPhaseType
    ): Exercise[] {
        const workList = treatment.phasesWorkList.find(
            phaseWorkList => phaseWorkList.phase.id === currentPhase
        );
        return ExercisesService.getExercisesByIds(workList.exercisesId);
    }
}
