import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    modal: {
        position: 'absolute',
        top: '5%',
        left: '5%',
        width: '90%',
        maxHeight: '98%',
        overflow: 'hidden'
    }
});

export default styles;
