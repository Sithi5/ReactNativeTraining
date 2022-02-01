import React from 'react';

import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

function TestCubesAlignments() {
    return (
        <View style={styles.main_container}>
            <View
                style={{ height: 50, width: 50, backgroundColor: 'green' }}
            ></View>
            <View
                style={{ height: 50, width: 50, backgroundColor: 'yellow' }}
            ></View>
            <View
                style={{ height: 50, width: 50, backgroundColor: 'red' }}
            ></View>
        </View>
    );
}

export default TestCubesAlignments;

const styles = StyleSheet.create({
    main_container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: 'blue',
    },
});
