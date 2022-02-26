import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.grey.light,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    controls: {
        width: '90%',
        marginBottom: 10
    }
});

export default styles;
