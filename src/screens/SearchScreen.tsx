import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { SectionList, StyleSheet, View, Text } from "react-native";
import SafeAreaContainer from '../components/SafeAreaContainer';
import Title from '../components/Title';
import theme from '../config/Theme';
import PreviewCard from '../components/PreviewCard';
import useRecentlyAddedBeatmaps from "../hooks/useRecentlyAddedBeatmaps";

type Props = BottomTabScreenProps<{}>;

const SearchScreen: React.FC<Props> = ({route}) => {

    const [results, fetch] = useRecentlyAddedBeatmaps();

    return (
        <SafeAreaContainer>
            <SectionList
                    style={styles.container}
                    indicatorStyle={theme.custom.indicator}
                    showsVerticalScrollIndicator
                    scrollIndicatorInsets={{top: 140}}
                    ListHeaderComponent={<Title name={route.name}/>}
                    renderSectionHeader={({section: { title }}) => {
                        return (
                            <View style={styles.sectionHeader}>
                                <Text style={styles.subTitle}>{title}</Text>
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
    subTitle: {
        color: theme.navigation.colors.text,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 15,
        marginTop: 15
    }
})

export default SearchScreen;