/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const bgStyle = {
        backgroundColor: isDarkMode ? Colors.lighter : Colors.darker
    };
    const textStyle = {
        color: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={bgStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="always"
                style={bgStyle}>
                <View style={textStyle}>
                    <Text style={styles.link}>This is the start of a long journey !</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    link: {
        flex: 2,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.primary,
    }
});

export default App;
