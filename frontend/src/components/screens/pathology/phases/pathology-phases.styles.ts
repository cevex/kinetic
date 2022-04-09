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
    header: {
        backgroundColor: globalVariables.color.white,
        // flex: 1,
        width: '100%',
        padding: 10
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    headerTitleIcon: {
        marginLeft: 10
    },
    headerText: {
        color: globalVariables.color.primary,
        marginLeft: 10,
        fontSize: globalVariables.fontSize.big,
        fontWeight: '700'
    },
    headerProgress: {
        marginTop: 10,
        marginLeft: 10
    },
    session: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    sessionHeader: {
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sessionHeaderTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    sessionHeaderTitleText: {
        color: globalVariables.color.primary,
        paddingLeft: 10,
        fontSize: globalVariables.fontSize.medium,
        fontWeight: '600'
    },
    sessionHeaderAside: {
        color: globalVariables.color.accent,
        fontSize: globalVariables.fontSize.medium,
        fontWeight: '600'
    },
    controls: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white'
    },
    controlsValidate: {
        marginBottom: 10,
        width: '95%'
    },
    controlsNext: {
        marginBottom: 10,
        width: '95%'
    }
});

export default styles;
