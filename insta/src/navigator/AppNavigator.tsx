import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { UserCommentsScreen } from "../screens/UserCommentsScreen";
import { UserLikesScreen } from "../screens/UserLikesScreen";
import { CommentScreen } from "../screens/CommentScreen";
import { InstagramPhoto } from "../interfaces/unsplashInterfaces";

export type RootStackParams = {
    HomeScreen: undefined;
    UserCommentsScreen: undefined;
    UserLikesScreen: undefined;
    CommentScreen: { photo: InstagramPhoto };
};

export const AppNavigator = () => {
    const Stack = createStackNavigator<RootStackParams>();

    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerMode: "float",
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="UserCommentsScreen" component={UserCommentsScreen} />
            <Stack.Screen name="UserLikesScreen" component={UserLikesScreen} />
            <Stack.Screen name="CommentScreen" component={CommentScreen} />
        </Stack.Navigator>
    );
}
