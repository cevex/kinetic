import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BodyAreaType } from '../../../../core/domain/body/body-area-data.model';
import { HealthcheckActionner } from '../../../../core/store/healthcheck/healthcheck.actions';
import { KineticState } from '../../../../core/store/kinetic.state';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import I18n from '../../../i18n';
import KntButton from '../../../ui/actions/button/button.component';
import { UiItem } from '../../../ui/core/ui-item.model';
import { TestLocationScreenState } from './test-location-screen.model';
import { TestLocationScreenService } from './test-location-screen.service';
import styles from './test-location-screen.style';

interface TestLocationScreenProp extends ScreenProp {
    taskId: string;
    chooseLocation: (bodyAreas: BodyAreaType[]) => void;
}

class TestLocationScreen extends Component<TestLocationScreenProp, TestLocationScreenState> {
    constructor(props: TestLocationScreenProp) {
        super(props);
        this.state = TestLocationScreenService.initScreen(this.props.taskId);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.choices.map((choice: UiItem) => (
                    <KntButton
                        key={choice.id}
                        label={I18n.t(choice.label)}
                        type="primary"
                        style={styles.control}
                        onPress={() =>
                            this.props.chooseLocation(
                                this.state.choices.map(item => item.id as BodyAreaType)
                            )
                        }
                    />
                ))}
            </View>
        );
    }
}

export default connect(
    (state: KineticState) => ({
        taskId: state.onGoingHealthcheck.taskId
    }),
    (dispatch: Dispatch) => ({
        chooseLocation: (bodyAreas: BodyAreaType[]) => {
            dispatch(HealthcheckActionner.chooseLocation(bodyAreas));
        }
    })
)(TestLocationScreen);
