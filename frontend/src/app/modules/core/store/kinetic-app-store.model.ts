import { User } from '../domain/user/user.model';

export interface KineticAppStore {
    usersData: User[];
}
