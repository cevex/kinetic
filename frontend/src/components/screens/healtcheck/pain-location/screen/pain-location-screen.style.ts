import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../../styles';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalVariables.color.white
    },
    messageContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%'
    },
    messageTitle: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.xbig,
        fontWeight: '600',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 15
    },
    imagesContainer: {
        flex: 6,
        width: '40%'
    },
    images: {
        width: '80%'
    },
    controls: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%'
    },
    adviceText: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.medium,
        marginBottom: 10
    }
});

export default styles;
