import { Healthcheck } from '~/app/modules/core/domain/healthcheck/healthcheck-data.model';
import { User } from '~/app/modules/core/domain/user/user.model';

export interface KineticStore {
    users: User[];
    selectedUser: User;

    onGoingHealthcheck?: Healthcheck;
}
