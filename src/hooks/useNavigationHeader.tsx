import React, { ReactEventHandler, useRef } from "react"
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from "react-native";

const useNavigationHeader = (): [Animated.Value, Function] => {

    const offset = useRef(new Animated.Value(0)).current;

    const scrollHandler = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        Animated.timing(offset, {
            toValue: nativeEvent.contentOffset.y,
            duration: 0,
            useNativeDriver: false,
        }).start();
    }

    return [offset, scrollHandler];

}

export default useNavigationHeader;