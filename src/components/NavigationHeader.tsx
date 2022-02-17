import React from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from '../config/Theme';

type Props = {
    name: string,
    offset: Animated.Value
}

const NavigationHeader: React.FC<Props> = ({name, offset}) => {

    const insets = useSafeAreaInsets();
    const headerHeight = insets.top + (name ? 40 : 0);

    const opacity = offset ? offset.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 1],
        extrapolate: "clamp"
    }) : 1;

    return (
        <Animated.View
            style={{
                ...style.container,
                height: headerHeight,
                opacity: opacity,
                paddingTop: insets.top
            }}
        >
            {
                name ?
                <Text style={style.name}>{name}</Text>
                :
                null
            }
        </Animated.View>
    )
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: theme.navigation.colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    name: {
        color: theme.navigation.colors.text,
        fontWeight: "600",
        fontSize: 16,
        marginVertical: 10
    }
})

export default NavigationHeader;