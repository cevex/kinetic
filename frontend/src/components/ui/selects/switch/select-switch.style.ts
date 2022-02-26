import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',

        width: '100%',
        height: 44,

        backgroundColor: globalVariables.color.grey.light,
        borderRadius: 8
    },
    switchButton: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 1
    },
    switchButtonSelected: {
        backgroundColor: globalVariables.color.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: globalVariables.color.grey.light,
        height: 42
    },
    switchButtonUnselected: {
        backgroundColor: globalVariables.color.grey.light
    },
    switchButtonText: {
        fontSize: globalVariables.fontSize.medium,
        textAlign: 'center'
    }
});

export default styles;
