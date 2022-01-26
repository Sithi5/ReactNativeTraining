import React, { useRef } from 'react';
import { Animated, Button, StyleSheet, View, PanResponder } from 'react-native';

export default function TestScreen() {
    const spring_anim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const left_anim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    let top_position = 0;
    let left_position = 0;

    const pan_responder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: () => {
            console.log('moooving');
            top_position = 100;
        },
    });

    function spring() {
        Animated.parallel([
            Animated.sequence([
                Animated.spring(spring_anim, {
                    toValue: 100,
                    speed: 4,
                    bounciness: 10,
                    useNativeDriver: false,
                }),
                Animated.spring(spring_anim, {
                    toValue: 0,
                    speed: 10,
                    bounciness: 40,
                    useNativeDriver: false,
                }),
            ]),
            Animated.timing(left_anim, {
                toValue: 100,
                useNativeDriver: false,
                duration: 1000,
            }),
        ]).start();
    }

    return (
        <View style={styles.main_container}>
            <Button title="Clickclick" onPress={spring}></Button>
            <Animated.View
                style={{
                    ...styles.animation_view,
                    top: top_position,
                    left: left_anim,
                }}
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
