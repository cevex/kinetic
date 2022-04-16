import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const breadcrumbStyles = StyleSheet.create({
    breadcrumbContainer: {
        flexDirection: 'row'
    },
    breadcrumbItem: {
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        borderWidth: 1,
        marginRight: 10
    },
    breadcrumbItemUnselected: {
        borderColor: globalVariables.color.primary,
        backgroundColor: globalVariables.color.white
    },
    breadcrumbItemSelected: {
        borderColor: globalVariables.color.primary,
        backgroundColor: globalVariables.color.primary
    }
});

export default breadcrumbStyles;
