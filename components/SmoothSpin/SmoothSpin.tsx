/*
 * @author Vitali
 * @created at 2025
 */
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const SmoothSpin = () => {
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withRepeat(
      withTiming(360, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    return () => {
      animation.value = 0;
    };
  }, []);

  const animationStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${animation.value}deg`}],
  }));

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.text}>Card</Text>
        </View>
        <Animated.View style={[styles.rotateContainer, animationStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#323232',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    overflow: 'hidden',
    padding: 4,
    backgroundColor: 'black',
    borderRadius: 14,
    alignItems: 'center',
  },
  rotateContainer: {
    position: 'absolute',
    top: -100,
    bottom: -100,
    width: 150,
    backgroundColor: '#FF1E56',
    alignSelf: 'center',
  },
  card: {
    width: 200,
    height: 300,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  text: {
    color: 'white',
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});
