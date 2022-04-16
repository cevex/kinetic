import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.white,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    assessment: {
        backgroundColor: globalVariables.color.white,
        // flex: 1,
        width: '100%',
        marginBottom: 25
    },
    controls: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 25
    }
});

export default styles;
