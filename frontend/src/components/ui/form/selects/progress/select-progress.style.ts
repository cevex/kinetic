import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../../styles';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

        width: '100%',
        borderRadius: 8
    },
    selectButton: {
        width: 30,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        borderRadius: 8
    },
    selectButtonSelected: {
        borderColor: globalVariables.color.grey.light,
        borderWidth: 2,
        width: 40,
        height: 50
    },
    selectButtonUnselected: {
        borderColor: globalVariables.color.grey.light,
        borderWidth: 0
    },
    selectButtonText: {
        fontSize: globalVariables.fontSize.medium,
        fontWeight: 'normal',
        textAlign: 'center'
    },
    selectButtonTextSelected: {
        fontWeight: 'bold',
        fontSize: globalVariables.fontSize.big,
        textAlign: 'center'
    }
});

export default styles;
