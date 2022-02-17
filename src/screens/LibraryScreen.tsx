import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import theme from "../config/Theme";
import useNavigationHeader from "../hooks/useNavigationHeader";
import SafeAreaContainer from '../components/SafeAreaContainer';
import NavigationHeader from "../components/NavigationHeader";
import Title from '../components/Title';

type Props = BottomTabScreenProps<{}>;

const LibraryScreen: React.FC<Props> = ({ route }: Props) => {

    const [offset, scrollHandler] = useNavigationHeader();
    
    return (
        <SafeAreaContainer>
            <NavigationHeader offset={offset} name={route.name}/>
            <ScrollView
                style={style.container}
                onScroll={(event) => scrollHandler(event)}
                scrollEventThrottle={16}
                indicatorStyle={theme.custom.indicator}
                showsVerticalScrollIndicator
            >
                <Title name={route.name}/>
            </ScrollView>
        </SafeAreaContainer>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
});

export default LibraryScreen;