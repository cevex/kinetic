import { StyleSheet } from 'react-native';
import { globalVariables } from '../../styles';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalVariables.color.white
    },
    imagesContainer: {
        margin: 20,
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    messageTitle: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.xbig,
        fontWeight: '600',
        margin: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    messageLabel: {
        color: globalVariables.color.primaryLight,
        fontSize: globalVariables.fontSize.medium,
        margin: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    controls: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;
