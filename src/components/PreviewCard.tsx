import React, { useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import theme from '../config/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Beatmap from "../interfaces/Beatmap";
import usePreviewService from "../hooks/usePreviewService";
import PreviewService from "../services/PreviewService";

type Props = {
    beatmap: Beatmap
}

const PreviewCard: React.FC<Props> = ({ beatmap }) => {

    const {artist, title, id, covers} = beatmap;

    const [previewState] = usePreviewService();

    const isCurrentSongPlaying = previewState.playingBeatmapsetID == id;
    const isPlayerPlaying = previewState.isPlaying;

    const initialOffset = isCurrentSongPlaying ? 100 : 0;
    const offset = useRef(new Animated.Value(0)).current;

    Animated.timing(offset, {
        toValue: initialOffset,
        duration: 200,
        useNativeDriver: false,
    }).start();

    const coverOpacity = offset.interpolate({
        inputRange: [0, 100],
        outputRange: [0.8, 1],
    });

    const titleColor = offset.interpolate({
        inputRange: [0, 100],
        outputRange: [theme.navigation.colors.text, theme.navigation.colors.primary],
    });

    const indicatorWidth = offset.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 19],
    });

    const indicatorOpacity = offset.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
    });

    const AnimatedImage = Animated.Image;
    const AnimatedText = Animated.Text;
    const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

    const playPreview = () => {
        PreviewService.play(id);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={playPreview} style={styles.container}>
                <View style={styles.container}>

                    <View style={styles.cover}>
                        <AnimatedImage
                            style={{...styles.image, opacity: coverOpacity}}
                            source={{uri: covers.list}}
                            resizeMode="cover"
                        />
                    </View>

                    <View style={styles.wrapper}>

                        <View style={styles.titleWrapper}>
                                <AnimatedIonicons
                                    name={isPlayerPlaying ? "pause-circle" : "play-circle"}
                                    style={{
                                        ...styles.playingIcon,
                                        width: indicatorWidth,
                                        opacity: indicatorOpacity,
                                    }}
                                />
                            <AnimatedText numberOfLines={1} style={{...styles.songTitle, flexShrink: 1, color: titleColor}}>
                                {title}
                            </AnimatedText>
                        </View>
                        <Text numberOfLines={1} style={styles.songArtist}>{artist}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Ionicons name="arrow-down-circle" style={styles.icon}/>
            <View style={{width: 24}}/>
            <Ionicons name="ellipsis-vertical" style={styles.icon}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        alignItems: "center"
    },
    cover: {
        height: 60,
        width: 60,
        borderRadius: 20,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    image: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wrapper: {
        flexDirection: 'column',
        marginHorizontal: 10,
        flexShrink: 1,
        flexGrow: 1,
    }, 
    icon: {
        fontSize: 24,
        color: theme.navigation.colors.text,
    },
    playingIcon: {
        fontSize: 16,
        color: theme.navigation.colors.primary,
    },
    titleWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        flexShrink: 1,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.navigation.colors.text,
    },
    songArtist: {
        fontSize: 14,
        fontWeight: "500",
        color: theme.custom.subtext,
    },
});

export default PreviewCard;