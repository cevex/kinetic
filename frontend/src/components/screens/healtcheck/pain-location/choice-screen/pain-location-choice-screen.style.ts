import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalVariables.color.white
    },
    imagesContainer: {
        flex: 1,
        width: '100%'
    },
    modalContainer: {
        position: 'absolute',
        left: '3%',
        bottom: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        borderRadius: 5,
        padding: 15,
        backgroundColor: globalVariables.color.white
    },
    modalTitle: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.xbig,
        fontWeight: '600',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 15
    },
    modalLabel: {
        color: globalVariables.color.primaryLight,
        fontSize: globalVariables.fontSize.medium,
        fontWeight: '600',
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 15
    },
    controls: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%'
    },
    controlsPagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    controlsPaginationButton: {
        flex: 1,
        margin: 0
    }
});

export default styles;
