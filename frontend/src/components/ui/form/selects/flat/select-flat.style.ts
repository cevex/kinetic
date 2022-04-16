import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../../styles';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    itemSelected: {
        backgroundColor: globalVariables.color.primary,
        borderRadius: 50
    },
    itemIcon: {
        fontSize: globalVariables.fontSize.xbig,
        padding: 10
    },
    itemText: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.medium,
        marginTop: 10
    }
});

export default styles;
