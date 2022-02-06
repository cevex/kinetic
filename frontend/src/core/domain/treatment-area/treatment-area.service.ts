import treatmentAreaData from '../../../assets/data/treatment-area.data.json';
import { TreatmentArea } from './treatment-area.model';

export class TreatmentAreaDataService {
    public static getTreatmentAreas(): TreatmentArea[] {
        return treatmentAreaData as TreatmentArea[];
    }

    public static getTreatmentAreasById(treatmentAreaId: string): TreatmentArea {
        return this.getTreatmentAreas().find(treatmentArea => treatmentArea.id === treatmentAreaId);
    }
}
