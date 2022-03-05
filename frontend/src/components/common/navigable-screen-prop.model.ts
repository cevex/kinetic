import { NavigationProp, ParamListBase, Route } from '@react-navigation/native';

export interface ScreenProp {
    route: Route<string, any>;
    navigation: NavigationProp<ParamListBase>;
}
