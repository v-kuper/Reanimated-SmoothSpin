/*
 * @author Vitali
 * @created at 2025
 */
import React, {useEffect} from 'react'
import {StatusBar, StyleSheet, Text, View} from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

const CARD_WIDTH = 200
const CARD_HEIGHT = 300
const CARD_RADIUS = 10
const SPIN_DURATION = 5000
const ROTATE_DEG = 360

export const SmoothSpin = () => {
  const animation = useSharedValue(0)

  useEffect(() => {
    animation.value = withRepeat(
      withTiming(ROTATE_DEG, {
        duration: SPIN_DURATION,
        easing: Easing.linear,
      }),
      -1,
      false,
    )

    return () => {
      animation.value = 0
    }
  }, [])

  const animationStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${animation.value}deg`}],
  }))

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
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#323232',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    overflow: 'hidden',
    padding: 3,
    backgroundColor: 'black',
    borderRadius: CARD_RADIUS + 3,
    alignItems: 'center',
  },
  rotateContainer: {
    position: 'absolute',
    top: -(CARD_WIDTH / 2),
    bottom: -(CARD_WIDTH / 2),
    width: CARD_HEIGHT / 2,
    backgroundColor: '#FF1E56',
    alignSelf: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'black',
    borderRadius: CARD_RADIUS,
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
})
