import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.grey.xlight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    control: {
        width: '90%',
        marginBottom: 15
    }
});
export default styles;
