import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { SectionList, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import SafeAreaContainer from '../components/SafeAreaContainer';
import Title from '../components/Title';
import theme from '../config/Theme';
import PreviewCard from '../components/PreviewCard';
import useRecentBeatmaps from "../hooks/useRecentBeatmaps";
import LoadingIndicator from '../components/LoadingIndicator';
import SearchBar from "../components/SearchBar";

type Props = BottomTabScreenProps<{}>;

const SearchScreen: React.FC<Props> = ({route}) => {

    const [results, fetching, fetch] = useRecentBeatmaps();

    return (
        <SafeAreaContainer>

            <LoadingIndicator loading={fetching}/>
            <SectionList
                    style={styles.container}
                    indicatorStyle={theme.custom.indicator}
                    showsVerticalScrollIndicator
                    scrollIndicatorInsets={{top: 140}}
                    ListHeaderComponent={<Title name={route.name}/>}
                    renderSectionHeader={({section: { title }}) => {
                        return (
                            <View style={styles.sectionHeader}>
                                <SearchBar disabled/>
                                <Text style={styles.subtitle}>{title}</Text>
                            </View>
                        );
                    }}

                    sections={[{
                        title: "New ranked maps on Beatconnect",
                        data: results
                    }]}
                    
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <PreviewCard beatmap={item}/>}
                    windowSize={3}
                    onEndReached={() => fetch()}
                    onEndReachedThreshold={0.5}
                    getItemLayout={(data, index) => ({index, length: 60, offset: index * (60 + 15)})}
                    ItemSeparatorComponent={() => <View style={styles.seperatorComponent}/>}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="never"
                    keyboardDismissMode="on-drag"
                />
        </SafeAreaContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    content: {
        paddingBottom: 15
    },
    sectionHeader: {
        backgroundColor: theme.navigation.colors.background,
        paddingTop: 15
    },
    seperatorComponent: {
        height: 1,
        marginVertical: 7,
        backgroundColor: theme.navigation.colors.border
    },
    subtitle: {
        color: theme.navigation.colors.text,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 15,
        marginTop: 15
    }
})

export default SearchScreen;