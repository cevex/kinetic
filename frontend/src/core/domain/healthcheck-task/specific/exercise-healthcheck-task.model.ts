import { PainAssessmentChoiceTriple } from '../choice/pain-assessment-choice.model';
import { HealthcheckTask } from '../healthcheck-task.model';

export interface ExerciseHealthcheckTask extends HealthcheckTask {
    exerciseId: string;
    choice: PainAssessmentChoiceTriple;
}
