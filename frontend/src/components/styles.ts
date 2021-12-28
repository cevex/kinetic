import { StyleSheet } from 'react-native';

export const globalVariables = {
    color: {
        white: 'white',
        dark: 'black',
        primary: '#432C81',
        primaryLight: '#82799D',
        accent: '#CF35A4',
        grey: {
            xlight: '#efefef',
            light: '#e1e1e1',
            medium: '#d2d2d2'
        }
    },
    fontSize: {
        small: 13,
        medium: 16,
        big: 20,
        xbig: 24
    }
};

export const globalStyles = StyleSheet.create({
    card: {
        backgroundColor: globalVariables.color.white,
        borderRadius: 6,
        padding: 10,
        margin: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 25,
            height: 25
        }
    },
    cardTitle: {
        color: globalVariables.color.dark,
        fontSize: globalVariables.fontSize.xbig,
        fontWeight: '600',
        marginTop: 15
    },
    cardMessage: {
        color: globalVariables.color.primaryLight,
        margin: 15,
        textAlign: 'center',
        fontSize: globalVariables.fontSize.medium,
        fontWeight: '600'
    }
});
