import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: '100%',
        flex: 1,
        paddingLeft: 15
    },
    headerTitleText: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.xbig,
        fontWeight: '600',
        marginLeft: 10
    },
    headerChoice: {
        height: 50,
        alignItems: 'center',
        margin: 10
    },
    sessionContainer: {
        flex: 1,
        width: '100%'
    }
});
export default styles;
