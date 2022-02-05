import { BodyArea } from '../../../../../core/domain/body/body-area-data.model';

export interface PainLocationChoiceScreenState {
    bodyAreas: BodyArea[];
    focusArea: BodyArea;
    focusIndex: number;
    focusAreaSelected: boolean;
    selectedAreas: BodyArea[];
}
