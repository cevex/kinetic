import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.grey.xlight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    videoPlayer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '90%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    controls: {
        width: '90%',
        marginBottom: 15
    }
});

export default styles;
