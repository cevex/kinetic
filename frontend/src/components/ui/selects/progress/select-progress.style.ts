import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',

        width: '100%',
        borderRadius: 8
    },
    selectButton: {
        width: 30,
        height: 40,
        alignContent: 'center',
        justifyContent: 'center',
        marginRight: 5,
        borderRadius: 8
    },
    selectButtonSelected: {
        borderColor: globalVariables.color.grey.light,
        borderWidth: 2
    },
    selectButtonUnselected: {
        borderColor: globalVariables.color.grey.light,
        borderWidth: 0
    },
    selectButtonText: {
        fontSize: globalVariables.fontSize.medium,
        fontWeight: '600',
        textAlign: 'center'
    }
});

export default styles;
