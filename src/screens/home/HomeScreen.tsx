// src/screens/home/HomeScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Tipler
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { League } from '../../types/models';

// Bileşenler
import LeagueCard from '../../components/common/LeagueCard';

// Mock veriler
import { popularLeagues, allLeagues } from '../../constants/mockData';
import colors from '../../constants/colors';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleLeaguePress = (league: League) => {
    // LeagueDetails ekranına yönlendirme
    // Şimdilik bu ekran olmadığı için yorum satırı olarak bırakıyorum
    // navigation.navigate('LeagueDetails', { 
    //   leagueId: league.id, 
    //   leagueName: league.name 
    // });
    
    // Yerine bir konsol mesajı
    console.log('Seçilen lig:', league.name);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Başlık */}
        <View className="px-4 py-3">
          <Text className="text-2xl font-bold text-gray-800">Futbol Ligler</Text>
          <Text className="text-gray-500 mt-1">Favori liglerini keşfet ve takip et</Text>
        </View>

        {/* Popüler Ligler Bölümü */}
        <View className="mt-2">
          <View className="flex-row justify-between items-center px-4 mb-2">
            <Text className="text-lg font-bold text-gray-800">Popüler Ligler</Text>
            <TouchableOpacity 
              className="flex-row items-center" 
              onPress={() => console.log('Tümünü Gör')}
            >
              <Text className="text-blue-500 mr-1">Tümünü Gör</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 15, paddingRight: 15 }}
          >
            {popularLeagues.map((league) => (
              <LeagueCard
                key={league.id}
                league={league}
                onPress={handleLeaguePress}
                size="medium"
              />
            ))}
          </ScrollView>
        </View>

        {/* Tüm Ligler Bölümü */}
        <View className="mt-6">
          <View className="px-4 mb-3">
            <Text className="text-lg font-bold text-gray-800">Tüm Ligler</Text>
          </View>

          <View className="flex-row flex-wrap justify-center px-2">
            {allLeagues.map((league) => (
              <LeagueCard
                key={league.id}
                league={league}
                onPress={handleLeaguePress}
                size="small"
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;