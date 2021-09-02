import { Healthcheck } from '../healthcheck/healthcheck-data.model';

export declare type Gender = 'm' | 'f';

export interface User {
    id?: string;
    userProfile: UserProfile;
    showGuide: boolean;
    healthcheckList: Healthcheck[];

    lastVisited: boolean;
}

export interface UserProfile {
    id?: string;
    name: string;
    avatar: string;
    gender: Gender;
}
