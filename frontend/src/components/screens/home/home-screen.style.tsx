import React from 'react';
import { StyleSheet } from 'react-native';
import { globalVariables } from '../../styles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: globalVariables.color.primary,
        marginBottom: 10,
        fontSize: globalVariables.fontSize.big,
        fontWeight: '600'
    },
    controls: {
        width: '90%',
        margin: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;
