import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import theme from '../config/Theme';

type Props = {
    loading: boolean
}

const LoadingIndicator: React.FC<Props> = ({loading}) => {

    return (
        <>
        
        {loading ?
                <ActivityIndicator style={styles.loadingIndicator} color={theme.navigation.colors.text}></ActivityIndicator>
            : null}

        </>
    );
}

const styles = StyleSheet.create({
    loadingIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        top: "50%",
        padding: 15,
        borderRadius: 10,
        backgroundColor: theme.navigation.colors.card,
        zIndex: 1000,
    }

})

export default LoadingIndicator;