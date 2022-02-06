import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { globalVariables } from '../../../styles';
import KntCheckBox from '../../../ui/check-box/check-box.component';

interface ExerciseItemProp {
    exercise: Exercise;
    selected: boolean;
    showCheck?: boolean;
}

class ExerciseItem extends Component<ExerciseItemProp> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    {this.props.showCheck && (
                        <View style={styles.box}>
                            <KntCheckBox checked={this.props.selected} />
                        </View>
                    )}
                    <Text style={[styles.text, !this.props.showCheck && styles.textAlone]}>
                        {this.props.exercise.label}
                    </Text>
                </View>
                <Image
                    style={styles.img}
                    source={require('../../../../assets/images/play-button.png')}
                />
            </View>
        );
    }
}

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
        maxWidth: '80%',
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
        paddingTop: 15
    },
    img: {
        // width: 50
        // height: 50
    }
});

export default ExerciseItem;
