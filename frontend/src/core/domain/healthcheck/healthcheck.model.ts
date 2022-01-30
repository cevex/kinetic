import { BodyAreaType } from '../body/body-area-data.model';

export interface Healthcheck {
    /** Is the treatment has been started */
    treatmentStart?: boolean;

    /** Is the disclaimer seen ? */
    disclaimerSeen?: boolean;

    /** The body areas to treat */
    selectedBodyArea?: BodyAreaType[];

    /** The body areas to treat */
    bodyArea?: BodyAreaType;

    /** Identifier of the current task of the check */
    taskId: string;

    /** Identifier of the previous task that lead to the current */
    previousTaskId: string[];
}
