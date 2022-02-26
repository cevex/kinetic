import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.grey.xlight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    video: {
        flex: 2
    },
    videoPlayer: {
        width: '90%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    assessment: {
        flex: 2,
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 15
    },
    controls: {
        width: '90%',
        marginBottom: 15
    }
});

export default styles;
