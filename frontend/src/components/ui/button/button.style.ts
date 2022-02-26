import { StyleSheet } from 'react-native';
import { globalVariables } from '../../styles';

const buttonStyles = StyleSheet.create({
    container: {
        height: 45,
        alignItems: 'center',
        margin: 5,

        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    },
    text: {
        fontSize: globalVariables.fontSize.medium
    },
    disabled: {
        opacity: 0.5
    },
    fullWidth: {
        width: '100%'
    }
});

export default buttonStyles;
