import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';

const TeamsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg font-bold text-gray-800">Takımlar Ekranı</Text>
        <Text className="text-gray-500 mt-2 text-center">
          Bu ekranda takım listesi ve takım detayları gösterilecek.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TeamsScreen;