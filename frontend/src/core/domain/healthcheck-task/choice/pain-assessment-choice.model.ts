export declare type PainAssessChoiceType = 'dual' | 'triple';
export declare type PainAssessChoiceDualType = 'yes' | 'no';
export declare type PainAssessChoiceTripleType = 'less' | 'equal' | 'more';

export interface PainAssessmentChoice {
    type: PainAssessChoiceType;
}

export interface PainAssessmentChoiceDual extends PainAssessmentChoice {
    yes: string;
    no: string;
}

export interface PainAssessmentChoiceTriple extends PainAssessmentChoice {
    less: string;
    equal: string;
    more: string;
}
