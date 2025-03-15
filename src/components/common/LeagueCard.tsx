// src/components/common/LeagueCard.tsx
import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  Image, 
  StyleSheet,
  ImageSourcePropType
} from 'react-native';
import { League } from '../../types/models';

interface LeagueCardProps {
  league: League;
  onPress: (league: League) => void;
  style?: object; // Özel stil eklemek için
  size?: 'small' | 'medium' | 'large'; // Kart boyutu
}

const LeagueCard: React.FC<LeagueCardProps> = ({ 
  league, 
  onPress, 
  style = {}, 
  size = 'medium' 
}) => {
  // Boyuta göre stil ayarlamaları
  const cardStyles = {
    small: {
      container: 'w-32 h-32 m-1 p-2',
      imageContainer: 'w-12 h-12 mb-2',
      titleText: 'text-xs font-bold',
      countryText: 'text-xs',
    },
    medium: {
      container: 'w-40 h-40 m-2 p-3',
      imageContainer: 'w-16 h-16 mb-3',
      titleText: 'text-sm font-bold',
      countryText: 'text-xs',
    },
    large: {
      container: 'w-48 h-48 m-2 p-4',
      imageContainer: 'w-20 h-20 mb-4',
      titleText: 'text-base font-bold',
      countryText: 'text-sm',
    },
  };

  const selectedStyle = cardStyles[size];

  return (
    <TouchableOpacity 
      className={`bg-white rounded-xl justify-center items-center shadow-sm ${selectedStyle.container}`}
      style={[{ elevation: 2 }, style]} // Android için shadow
      onPress={() => onPress(league)}
    >
      <View className={`${selectedStyle.imageContainer} justify-center items-center`}>
        <Image 
          source={{ uri: league.logo }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      
      <Text 
        className={`${selectedStyle.titleText} text-center text-gray-800`}
        numberOfLines={1}
      >
        {league.name}
      </Text>
      
      <View className="flex-row items-center mt-1">
        <Image 
          source={{ uri: league.flag }} 
          className="w-4 h-4 mr-1"
          resizeMode="contain"
        />
        <Text 
          className={`${selectedStyle.countryText} text-gray-500`}
          numberOfLines={1}
        >
          {league.country}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LeagueCard;