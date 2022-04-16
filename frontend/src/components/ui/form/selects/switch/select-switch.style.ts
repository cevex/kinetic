import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../../styles';

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',

        height: 35,

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
        margin: 0,
        borderColor: globalVariables.color.grey.light,
        height: 35
    },
    switchButtonUnselected: {
        backgroundColor: globalVariables.color.grey.light
    },
    switchButtonText: {
        color: globalVariables.color.dark,
        fontSize: globalVariables.fontSize.medium,
        fontWeight: '500',
        textAlign: 'center'
    }
});

export default styles;
