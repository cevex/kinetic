import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalVariables.color.white
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        // flex: 1,
        paddingTop: 15
    },
    headerTitleText: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.xbig,
        fontWeight: '600',
        marginLeft: 10
    },
    headerChoice: {
        // width: '90%',
        margin: 10
    },
    sessionContainer: {
        flex: 1,
        width: '100%'
    }
});
export default styles;
