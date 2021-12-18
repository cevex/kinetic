import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

interface CatProp {
    name: string;
}

interface CatState {
    isHungry: boolean;
}

export class CatComponent extends Component<CatProp, CatState> {
    state: CatState = { isHungry: true };

    render() {
        return (
            <View>
                <Text>
                    I am {this.props.name}, and I am
                    {this.state.isHungry ? ' hungry' : ' full'}!
                </Text>
                <Button
                    onPress={() => {
                        this.setState({ isHungry: false });
                    }}
                    disabled={!this.state.isHungry}
                    title={this.state.isHungry ? 'Pour me some milk, please!' : 'Thank you!'}
                />
            </View>
        );
    }
}
