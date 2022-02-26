import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.grey.xlight,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center'
    },
    videoPlayer: {
        width: '90%'
    },
    controls: {
        width: '90%',
        marginBottom: 15
    }
});

export default styles;
