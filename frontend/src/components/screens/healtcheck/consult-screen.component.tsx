import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenProp } from '../../common/navigable-screen-prop.model';
import I18n from '../../i18n';
import { globalStyles, globalVariables } from '../../styles';
import KntButton from '../../ui/button/button.component';

class ConsultScreen extends Component<ScreenProp> {
    render() {
        return (
            <View style={styles.container}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.cardTitle}>{I18n.t('consult.title')}</Text>
                    <Text style={globalStyles.cardMessage}>{I18n.t('consult.explain')}</Text>
                </View>
                <KntButton
                    label={I18n.t('navigation.next')}
                    type="primary"
                    style={styles.controls}
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.grey.light,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    controls: {
        width: '90%',
        marginBottom: 10
    }
});

export default ConsultScreen;
