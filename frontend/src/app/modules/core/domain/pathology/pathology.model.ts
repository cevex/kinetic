import { Healthcheck } from '../healthcheck/healthcheck-data.model';


export declare type PathologyScore = 0 | 1 | 2 | 3;

export interface Pathology {
    bodyArea: string;
    healthcheckList: Healthcheck[];
    score: PathologyScore;
}
