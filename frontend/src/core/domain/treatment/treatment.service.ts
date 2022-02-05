import treatmentData from '../../../assets/data/treatment.data.json';
import { Treatment } from './treatment.model';

export class TreatmentService {
    public static getTreatments(): Treatment[] {
        return this.mapTreatment(treatmentData);
    }

    public static getTreatmentByArea(area: string): Treatment {
        return this.getTreatments().find(treatment => treatment.area === area);
    }

    private static mapTreatment(treatments: any[]): Treatment[] {
        return treatments.map(treatment => {
            treatment.phases = treatment.phases.split(',');
            return treatment as Treatment;
        });
    }
}
