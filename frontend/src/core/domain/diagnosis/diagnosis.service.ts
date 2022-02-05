import diagnosisData from '../../../assets/data/diagnosis.data.json';
import { Diagnosis } from './diagnosis.model';

export class DiagnosisDataService {
    public static getDiagnosis(): Diagnosis[] {
        return diagnosisData as Diagnosis[];
    }

    public static getDiagnosisById(diagnosisId: string): Diagnosis {
        return this.getDiagnosis().find(diagnosis => diagnosis.id === diagnosisId);
    }
}
