import { createNavigationContainerRef } from '@react-navigation/native';

export class RootNavigation {
    public static navigationRef = createNavigationContainerRef();

    public static navigate(name: string, params?: never) {
        if (this.navigationRef.isReady()) {
            this.navigationRef.navigate(<never>name, params);
        }
    }
}
