import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    assessment: {
        backgroundColor: globalVariables.color.white,
        // flex: 1,
        width: '100%',
        padding: 10
    },
    places: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    controls: {
        flexDirection: 'row',
        width: '100%'
    }
});

export default styles;
