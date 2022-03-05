import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../../styles';

const styles = StyleSheet.create({
    container: {
        width: 161,
        height: 432
    },
    area: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 50
    },
    areaSelected: {
        backgroundColor: globalVariables.color.accent,
        borderColor: globalVariables.color.white,
        borderWidth: 1
    },
    areaUnselected: {
        backgroundColor: globalVariables.color.success,
        borderWidth: 0
    }
});

export default styles;
