import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import I18n from '../../../i18n';
import { globalStyles } from '../../../styles';
import KntButton from '../../../ui/actions/button/button.component';
import styles from './consult-screen.style';

class ConsultScreen extends Component<ScreenProp> {
    render() {
        return (
            <View style={styles.container}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.cardTitle}>{I18n.t('consult.title')}</Text>
                    <Text style={globalStyles.cardMessage}>{I18n.t('consult.description')}</Text>
                    <Text style={globalStyles.cardMessage}>{I18n.t('consult.advice')}</Text>
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

export default ConsultScreen;
