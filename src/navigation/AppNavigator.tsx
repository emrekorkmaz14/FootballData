// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigasyon tipleri
import { RootStackParamList } from './NavigationTypes';

// Navigatörler
import BottomTabNavigator from './BottomTabNavigator';

// Ekranlar (sonradan eklenecek)
// import LeagueDetailsScreen from '../screens/leagues/LeagueDetailsScreen';
// import TeamDetailsScreen from '../screens/teams/TeamDetailsScreen';
// import MatchDetailsScreen from '../screens/matches/MatchDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerBackVisible: true, // Geri butonu görünür (sadece ikon)
          headerBackTitle: '', // iOS'ta geri buton yazısı (boş string = yazı yok)
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        
        {/* Diğer ekranlar proje ilerledikçe eklenecek */}
        {/* 
        <Stack.Screen
          name="LeagueDetails"
          component={LeagueDetailsScreen}
          options={({ route }) => ({ title: route.params.leagueName })}
        />
        
        <Stack.Screen
          name="TeamDetails"
          component={TeamDetailsScreen}
          options={({ route }) => ({ title: route.params.teamName })}
        />
        
        <Stack.Screen
          name="MatchDetails"
          component={MatchDetailsScreen}
          options={{ title: 'Maç Detayları' }}
        />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;