import { RouteProp } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text } from "react-native";
import theme from "../config/Theme";

type Props = {
    name: string
}

const Title: React.FC<Props> = ({name}) => {
    return (
        <Text style={style.title}>{name}</Text>
    )
}

const style = StyleSheet.create({
    title: {
        color: theme.navigation.colors.text,
        fontWeight: "bold",
        fontSize: 36,
        marginTop: 70
    }
});

export default Title;