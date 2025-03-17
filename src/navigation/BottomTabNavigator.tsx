// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Ekranlar
import HomeScreen from '../screens/home/HomeScreen';
import MatchesScreen from '../screens/matches/MatchesScreen';
import TeamsScreen from '../screens/teams/TeamsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Tab bar icon bileşeni
import TabBarIcon from '../components/ui/TabBarIcon';

// Tip tanımları
import { BottomTabParamList } from './NavigationTypes';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6', // blue-500
        tabBarInactiveTintColor: '#6b7280', // gray-500
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6', // gray-100
          paddingVertical: 12,
          height: 70, // Yüksekliği azaltıldı
          elevation: 8, // Android için gölge
          shadowOpacity: 0.1, // iOS için gölge
          shadowRadius: 3,
        },
        // Label'ları kaldır
        tabBarShowLabel: false,
        // Başlık çubuklarını kaldır
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="trophy" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="football" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Teams"
        component={TeamsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shield" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;