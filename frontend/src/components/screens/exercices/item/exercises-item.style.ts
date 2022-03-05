import { StyleSheet } from 'react-native';
import { globalVariables } from '../../../styles';

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,

        borderBottomColor: globalVariables.color.grey.light,
        borderBottomWidth: 1
    },
    left: {
        flexDirection: 'row'
        // flex: 1
    },
    text: {
        maxWidth: '90%',
        flexDirection: 'row',
        textAlignVertical: 'center',
        color: globalVariables.color.primary
    },
    textAlone: {
        flex: 1,
        height: '100%'
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 5
    },
    img: {
        width: 30,
        height: 30
    }
});

export default styles;
