import { PainAssessmentChoice } from '../choice/pain-assessment-choice.model';
import { HealthcheckTask } from '../healthcheck-task.model';

export class ExerciseHealthcheckTask extends HealthcheckTask {
    exerciseId: string;
    choice: PainAssessmentChoice;
}
