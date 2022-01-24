import { BodyAreaType } from '../../domain/body/body-area-data.model';

export interface Healthcheck {
    /** Is the treatment has been started */
    treatmentStart?: boolean;

    /** Should show disclaimer on healthcheck */
    showDisclaimer?: boolean;

    /** The body areas to treat */
    bodyArea?: BodyAreaType;

    /** Identifier of the current task of the check */
    taskId: string;

    /** Identifier of the previous task that lead to the current */
    previousTaskId: string[];
}
