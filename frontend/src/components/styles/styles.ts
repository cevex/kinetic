import { StyleSheet } from 'react-native';

export const globalVariables = {
    color: {
        bg: 'white',
        primary: '#432C81',
        primaryLight: '#82799D',
        accent: '#CF35A4'
    },
    fontSize: {
        small: 13,
        medium: 16,
        big: 20,
        xbig: 24
    }
};

export const globalStyles = StyleSheet.create({
    buttonPrimary: {
        // flex: 1,
        borderWidth: 1,
        backgroundColor: globalVariables.color.primary,
        color: globalVariables.color.bg
    },
    buttonSecondary: {
        // flex: 1,
        borderWidth: 1,
        borderColor: globalVariables.color.bg,
        color: globalVariables.color.primary
    }
});
