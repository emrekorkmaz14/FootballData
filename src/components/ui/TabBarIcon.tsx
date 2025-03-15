// src/components/ui/TabBarIcon.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type TabBarIconProps = {
  name: 'trophy' | 'football' | 'shield' | 'person' | string;
  color: string;
  size: number;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color, size }) => {
  // Ionicons'dan uygun icon adını seçme
  let iconName: string = name;

  // Platform-specific icons için dönüştürme (isteğe bağlı)
  if (name === 'football') {
    iconName = 'football-outline';
  } else if (name === 'trophy') {
    iconName = 'trophy-outline';
  } else if (name === 'shield') {
    iconName = 'shield-outline';
  } else if (name === 'person') {
    iconName = 'person-outline';
  }

  return <Ionicons name={iconName as any} size={size} color={color} />;
};

export default TabBarIcon;