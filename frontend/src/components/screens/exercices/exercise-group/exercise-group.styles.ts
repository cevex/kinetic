import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    exerciseGroup: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    exerciseGroupHeader: {
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    exerciseGroupContent: {
        flex: 1,
        width: '100%'
    },
    exerciseGroupHeaderTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    exerciseGroupHeaderTitleText: {
        fontSize: globalVariables.fontSize.medium,
        color: globalVariables.color.primary,
        marginLeft: 10
    },
    exerciseGroupHeaderAside: {
        color: globalVariables.color.accent,
        fontSize: globalVariables.fontSize.medium,
        fontWeight: '600'
    }
});

export default styles;
