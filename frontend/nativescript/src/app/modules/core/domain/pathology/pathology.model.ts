import { BodyArea } from '~/app/modules/core/domain/body/body-area-data.model';
import { Healthcheck } from '../healthcheck/healthcheck-data.model';


export declare type PathologyScore = 0 | 1 | 2 | 3;

export interface Pathology {
    bodyArea: BodyArea;
    healthcheckList: Healthcheck[];
    score: PathologyScore;
}
