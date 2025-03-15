// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

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
          paddingTop: 8,
          paddingBottom: 8,
          height: 100, // Yüksekliği artırdık
          elevation: 8, // Android için gölge
          shadowOpacity: 0.1, // iOS için gölge
          shadowRadius: 3,
        },
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0, // Android için gölgeyi kaldır
          shadowOpacity: 0, // iOS için gölgeyi kaldır
          borderBottomWidth: 1,
          borderBottomColor: '#f3f4f6', // gray-100
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Ligler',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="trophy" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          title: 'Maçlar',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="football" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Teams"
        component={TeamsScreen}
        options={{
          title: 'Takımlar',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="shield" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;