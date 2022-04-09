import { StyleSheet } from 'react-native';

export const globalVariables = {
    color: {
        white: 'white',
        dark: 'black',
        primary: '#432C81',
        primaryLight: '#82799D',
        primaryBackground: '#E1D6FF',
        accent: '#CF35A4',
        success: '#6BF299',
        grey: {
            xlight: '#efefef',
            light: '#e1e1e1',
            medium: '#d2d2d2'
        },
        danger: {
            strong: 'red',
            light: '#E86161FF'
        }
    },
    fontSize: {
        xsmall: 10,
        small: 13,
        medium: 16,
        big: 19,
        xbig: 22
    }
};

export const globalStyles = StyleSheet.create({
    card: {
        backgroundColor: globalVariables.color.white,
        borderRadius: 6,
        padding: 10,
        width: '90%',
        marginTop: 15,
        marginBottom: 15,
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
    },
    cardMessageHighlighted: {
        color: globalVariables.color.primary,
        margin: 15,
        textAlign: 'center',
        fontSize: globalVariables.fontSize.big,
        fontWeight: '600'
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        position: 'absolute',
        backgroundColor: globalVariables.color.white,
        borderRadius: 6,
        padding: 10,
        width: '90%',
        marginTop: 15,
        marginBottom: 15,
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
    }
});
