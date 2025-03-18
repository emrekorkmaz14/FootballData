// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Ekranlar
import HomeScreen from '../screens/home/HomeScreen';
import MatchesScreen from '../screens/matches/MatchesScreen';
import TeamsScreen from '../screens/teams/TeamsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Pill şeklinde tab bar
import PillShapedTabBar from '../components/ui/CustomTabBar';

// Tip tanımları
import { BottomTabParamList } from './NavigationTypes';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // Ekranların tab bar yüksekliği kadar aşağıdan padding almasını sağlar
        tabBarStyle: {
          height: 0, // Tab bar görünmez olacak çünkü custom tab bar kullanıyoruz
          elevation: 0,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
        }
      }}
      tabBar={props => <PillShapedTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
      />
      <Tab.Screen
        name="Teams"
        component={TeamsScreen}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;