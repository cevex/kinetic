import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import KntCheckBox from '../../../ui/check-box/check-box.component';

interface ExerciseItemProp {
    exercise: Exercise;
    selected: boolean;
}

class ExerciseItem extends Component<ExerciseItemProp> {
    render() {
        return (
            <View style={styles.container}>
                <KntCheckBox checked={false} />
                <Text>{this.props.exercise.label}</Text>
                <Image source={require('../../../../assets/images/play-button.png')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {}
});

export default ExerciseItem;
