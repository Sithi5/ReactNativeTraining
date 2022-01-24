import React, { useRef } from 'react';

import { View, StyleSheet, Animated } from 'react-native';

export default function TestScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    const springIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.spring(fadeAnim, {
            toValue: 100,
            speed: 4,
            bounciness: 30,
            useNativeDriver: true,
        }).start();
    };
    springIn();

    return (
        <View style={styles.main_container}>
            <Animated.View
                style={{ ...styles.animation_view, top: fadeAnim }}
            ></Animated.View>
        </View>
    );
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation_view: {
        backgroundColor: 'red',
        width: 100,
        height: 100,
    },
});
