import React from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="flex-1 p-4">
        <View className="items-center py-6">
          <View className="bg-gray-200 rounded-full w-20 h-20 justify-center items-center mb-3">
            <Ionicons name="person" size={40} color="#6b7280" />
          </View>
          <Text className="text-xl font-bold text-gray-800">Kullanıcı Adı</Text>
          <Text className="text-gray-500">kullanici@ornek.com</Text>
        </View>
        
        <View className="mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">Ayarlar</Text>
          
          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <Ionicons name="heart-outline" size={22} color="#6b7280" />
            <Text className="ml-3 text-gray-700">Favorilerim</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <Ionicons name="notifications-outline" size={22} color="#6b7280" />
            <Text className="ml-3 text-gray-700">Bildirimler</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <Ionicons name="moon-outline" size={22} color="#6b7280" />
            <Text className="ml-3 text-gray-700">Karanlık Mod</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <Ionicons name="settings-outline" size={22} color="#6b7280" />
            <Text className="ml-3 text-gray-700">Uygulama Ayarları</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center py-3">
            <Ionicons name="log-out-outline" size={22} color="#ef4444" />
            <Text className="ml-3 text-red-500">Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;