// src/components/common/Loading.tsx
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import colors from '../../constants/colors';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  color?: string;
  size?: 'small' | 'large';
}

const Loading: React.FC<LoadingProps> = ({
  message = 'Yükleniyor...',
  fullScreen = false,
  color = colors.primary,
  size = 'large'
}) => {
  if (fullScreen) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size={size} color={color} />
        {message && <Text className="mt-2 text-gray-600">{message}</Text>}
      </View>
    );
  }

  return (
    <View className="py-4 justify-center items-center">
      <ActivityIndicator size={size} color={color} />
      {message && <Text className="mt-2 text-gray-600">{message}</Text>}
    </View>
  );
};

export default Loading;