import { PainAssessmentChoice } from '../choice/pain-assessment-choice.model';
import { HealthcheckTask } from '../healthcheck-task.model';

export interface ExerciseHealthcheckTask extends HealthcheckTask {
    type: 'exercise';
    exerciseId: string;
    choice: PainAssessmentChoice;
}
