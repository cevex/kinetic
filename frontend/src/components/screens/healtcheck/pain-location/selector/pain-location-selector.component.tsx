import React, { Component } from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SelectorService } from '../../../../../core/common/selector.service';
import { BodyAreaType, BodyDirection } from '../../../../../core/domain/body/body-area-data.model';
import { globalVariables } from '../../../../styles';
import { PainLocationSelectorState } from './pain-location-selector.model';
import { BodyPosition, PainLocationSelectorService } from './pain-location-selector.service';

export interface PainLocationSelectorProp {
    bodyDirection: BodyDirection;
    selectedAreas: BodyAreaType[];
    onAreaSelection: (selectedAreas: BodyAreaType[]) => void;
}

class PainLocationSelector extends Component<PainLocationSelectorProp, PainLocationSelectorState> {
    constructor(props: PainLocationSelectorProp) {
        super(props);
        this.state = PainLocationSelectorService.initState(props, { width: 161, height: 432 });
    }

    private getStylePosition(bodyPosition: BodyPosition): StyleProp<ViewStyle> {
        return {
            left: bodyPosition.x,
            top: bodyPosition.y,
            width: bodyPosition.width,
            height: bodyPosition.height
        };
    }

    private selectArea(bodyAreaType: BodyAreaType) {
        const newSelectedArea = SelectorService.select(this.props.selectedAreas, bodyAreaType);
        this.props.onAreaSelection(newSelectedArea);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width: '100%' }} source={this.state.image} />

                {this.state.bodyPositions.map((bodyPosition: BodyPosition) => (
                    <TouchableOpacity
                        key={bodyPosition.id + bodyPosition}
                        style={[
                            styles.area,
                            this.getStylePosition(bodyPosition),
                            this.props.selectedAreas.includes(bodyPosition.id as BodyAreaType)
                                ? styles.areaSelected
                                : styles.areaUnselected
                        ]}
                        onPress={() => this.selectArea(bodyPosition.id as BodyAreaType)}
                    />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 161,
        height: 432
    },
    area: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 50
    },
    areaSelected: {
        backgroundColor: globalVariables.color.accent,
        borderColor: globalVariables.color.white,
        borderWidth: 1
    },
    areaUnselected: {
        backgroundColor: globalVariables.color.accent2,
        borderWidth: 0
    }
});

export default PainLocationSelector;
