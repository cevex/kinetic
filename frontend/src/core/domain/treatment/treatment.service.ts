import { cloneDeep, groupBy } from 'lodash-es';
import treatmentData from '../../../assets/data/treatment.data.json';
import { ExercisesService } from '../exercices/exercises.service';
import { Healthcheck } from '../healthcheck/healthcheck.model';
import { HealthcheckService } from '../healthcheck/healthcheck.service';
import { TreatmentAreaDataService } from '../treatment-area/treatment-area.service';
import { TreatmentPhase } from './phase/treatment-phase.model';
import { TreatmentPhaseService } from './phase/treatment-phase.service';
import { Treatment } from './treatment.model';

interface TreatmentData {
    area: string;
    exercise: string;
    phases: string;
}

export class TreatmentService {
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
        return treatmentData as TreatmentData[];
    }

    private static mapTreatment(treatmentsData: TreatmentData[]): Treatment[] {
        const groupByArea = groupBy(treatmentsData, 'area');

        return Object.keys(groupByArea).map((treatmentAreaId: string) => {
            const treatmentArea = TreatmentAreaDataService.getTreatmentAreasById(treatmentAreaId);
            return <Treatment>{
                area: treatmentArea,
                phases: this.mapPhasesForArea(<TreatmentData[]>groupByArea[treatmentAreaId])
            };
        });
    }

    private static mapPhasesForArea(treatmentsData: TreatmentData[]): TreatmentPhase[] {
        let finalPhases: TreatmentPhase[] = [];
        // console.log('mapPhasesForArea', treatmentsData);
        treatmentsData.forEach((treatmentData, treatmentIndex) => {
            const treatmentPhases = TreatmentPhaseService.mapTreatmentPhase(treatmentData.phases);
            treatmentPhases.forEach(phase => {
                const exercise = ExercisesService.getExercisesById(treatmentData.exercise);
                if (!exercise) {
                    console.log('WARNING : For phase : ', phase.name);
                    console.log('WARNING ==> Cannot find exercises ', treatmentData.exercise);
                    return;
                }
                const alreadyExistingPhase = finalPhases.find(p => p.id === phase.id);

                const phaseToHandle = alreadyExistingPhase
                    ? alreadyExistingPhase
                    : cloneDeep(phase);
                if (!phaseToHandle.exercises) {
                    phaseToHandle.exercises = [];
                }
                phaseToHandle.exercises.push(exercise);
                if (!alreadyExistingPhase) {
                    finalPhases.push(phaseToHandle);
                } else {
                    finalPhases = finalPhases.map(treatmentPhase => {
                        return treatmentPhase.id === phaseToHandle.id
                            ? phaseToHandle
                            : treatmentPhase;
                    });
                }
            });
        });
        return finalPhases;
    }
}
