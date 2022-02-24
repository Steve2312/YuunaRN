import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import theme from '../config/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from "react-native/Libraries/NewAppScreen";

type Props = {
    onPress?: Function
    disabled?: boolean,
    focusOnInit?: boolean,
    onChange?: Function
}

const SearchBar: React.FC<Props> = ({onPress, disabled, focusOnInit, onChange}) => {

    const [value, setValue] = useState("");

    const clear = () => {
        setValue("");
    }

    useEffect(() => {
        if (onChange) {
            onChange(value);
        }
    }, [value])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                editable={!disabled}
                keyboardAppearance={theme.navigation.dark ? "dark" : "light"}
                placeholder="Type here to search for beatmap sets"
                placeholderTextColor={theme.custom.subtext}
                keyboardType="web-search"
                onChange={({nativeEvent}) => {
                    setValue(nativeEvent.text)
                }}
            />
            { value != "" ? 
                <TouchableOpacity onPress={clear}>
                    <Ionicons name="ios-close-circle" style={styles.icon}/>
                </TouchableOpacity>
            : null }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.navigation.colors.card,
        height: 35,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        flexGrow: 1,
        flexShrink: 1
    },
    searchBar: {
        flexGrow: 1,
        flexShrink: 1,
        marginHorizontal: 10,
        color: theme.navigation.colors.text
    },
    icon: {
        color: theme.navigation.colors.text,
        marginHorizontal: 5,
        fontSize: 15
    }
});

export default SearchBar;