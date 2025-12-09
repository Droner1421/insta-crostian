import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { UserLikesScreen } from '../screens/UserLikesScreen';
import { UserCommentsScreen } from '../screens/UserCommentsScreen';
import { CommentScreen } from '../screens/CommentScreen';
import { InstagramPhoto } from '../interfaces/unsplashInterfaces';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Likes') {
                        iconName = 'heart';
                    } else if (route.name === 'Comments') {
                        iconName = 'message-circle';
                    }

                    return <Feather name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#BB86FC',
                tabBarInactiveTintColor: '#B0B0B0',
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopColor: '#1E1E1E',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Likes" component={UserLikesScreen} />
            <Tab.Screen name="Comments" component={UserCommentsScreen} />
        </Tab.Navigator>
    );
};

type RootStackParams = {
    Main: undefined;
    CommentScreen: { photo: InstagramPhoto };
};

export const BottomTabNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="CommentScreen" component={CommentScreen} />
        </Stack.Navigator>
    );
}
