/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import ChatRooms from '../screens/ChatRooms';
import TabTwoScreen from '../screens/TabTwoScreen';
import Chat from '../screens/Chat';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false}}/>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={ChatRooms}
        options={{
          header: ()=> (
            <SafeAreaView style={{height: 95, backgroundColor: "#075E54", flexDirection: "row", alignItems:"center", justifyContent: "space-between"}}>
              <View style={{flexDirection: "row", alignItems: "center", marginLeft: 8}}>
                <Image source={require("../assets/images/WhatsApp_icon.png")} style={{ width: 40, height: 40}}/>
                <Text style={tw`text-xl font-bold text-white ml-1`}>Whatsapp</Text>
              </View>
              <TouchableOpacity>
                <Feather name="search" size={26} color="white" style={{ marginRight: 8}}/>
              </TouchableOpacity>
            </SafeAreaView>),
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={24} color={color} />,
          tabBarShowLabel: false
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'calls',
          tabBarIcon: ({ color }) => <Feather name="phone" size={24} color={color} />,
          tabBarShowLabel: false
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabTwoScreen}
        options={{
          title: 'photo',
          tabBarIcon: ({ color }) => <Feather name="camera" size={24} color={color} />,
          tabBarShowLabel: false
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabTwoScreen}
        options={{
          title: 'settings',
          tabBarIcon: ({ color }) => <Ionicons name="md-settings-outline" size={24} color={color} />,
          tabBarShowLabel: false
        }}
      />
    </BottomTab.Navigator>
  );
}