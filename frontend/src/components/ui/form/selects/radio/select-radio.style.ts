import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../../styles';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%'
    },
    item: {
        flexDirection: 'row',
        // alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 15,
        width: '100%'
    },
    itemText: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.medium,
        fontWeight: 'normal',
        textAlign: 'center'
    }
});

export default styles;
