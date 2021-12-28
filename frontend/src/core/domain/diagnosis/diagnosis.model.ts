import { InfoDetail } from '../info-detail.model';

export interface Diagnosis {
    id: string;
    title?: string;
    name: string;
    info?: InfoDetail;
}
