import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import LibraryScreen from './screens/LibraryScreen';
import SearchScreen from './screens/SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from './config/Theme';
import { StatusBar } from 'react-native';

const App: React.FC = () => {
    
    const Tab = createBottomTabNavigator();

    const getIconName = (screen: string, focused: boolean): string => {
        switch(screen) {
            case "Search":
                return focused ? 'ios-search' : 'ios-search-outline';
            case "Library":
                return focused ? "ios-bookmark" : "ios-bookmark-outline";
            case "Settings":
                return focused ? "ios-settings" : "ios-settings-outline";
            default:
                return focused ? 'square' : 'square-outline';
        }
    }

    const navigatorOptions = ({ route }): BottomTabNavigationOptions => {
        return { 
            tabBarIcon: ({focused, size, color}): React.ReactNode => {
                return (
                    <Ionicons
                        name={getIconName(route.name, focused)}
                        size={size}
                        color={color}
                    />
                );
            }
        }
    }

    const screenOptions: BottomTabNavigationOptions = {
        headerShown: false
    }

    return (
        <NavigationContainer theme={theme.navigation}>
            <StatusBar barStyle={theme.custom.barStyle} />
            <Tab.Navigator initialRouteName="Search" screenOptions={navigatorOptions}>
                <Tab.Screen name="Search" component={SearchScreen} options={screenOptions} />
                <Tab.Screen name="Library" component={LibraryScreen} options={screenOptions} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App;