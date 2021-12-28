import diagnosisData from '../../../assets/data/diagnosis.data.json';
import { Diagnosis } from './diagnosis.model';

export class DiagnosisDataService {
    public getDiagnosis(): Diagnosis[] {
        return diagnosisData as Diagnosis[];
    }

    public getDiagnosisById(diagnosisId: string): Diagnosis | undefined {
        return this.getDiagnosis().find(diagnosis => diagnosis.id === diagnosisId);
    }
}
