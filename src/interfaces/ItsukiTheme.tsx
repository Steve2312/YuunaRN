import { Theme } from "@react-navigation/native"
import { StatusBarStyle } from "react-native";

interface ItsukiTheme {
    navigation: Theme,
    custom: {
        indicator: "default" | "black" | "white",
        barStyle: null | StatusBarStyle | undefined,
        subtext: string
    }
}

export default ItsukiTheme;