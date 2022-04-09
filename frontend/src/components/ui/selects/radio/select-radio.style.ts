import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

        width: '100%',
        borderRadius: 8
    },
    containerText: {
        color: globalVariables.color.grey.medium,
        fontSize: globalVariables.fontSize.medium,
        fontWeight: 'normal',
        textAlign: 'center'
    }
});

export default styles;
