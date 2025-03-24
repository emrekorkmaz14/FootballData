// src/components/common/CustomHeader.tsx
import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import colors from '../../constants/colors';

interface CustomHeaderProps {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightComponent?: ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  rightComponent
}) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <View style={styles.header}>
        {leftIcon && (
          <TouchableOpacity style={styles.iconButton} onPress={onLeftPress}>
            <Ionicons name={leftIcon as any} size={24} color="#1f2937" />
          </TouchableOpacity>
        )}

        <Text style={styles.title}>{title}</Text>

        <View style={styles.rightContainer}>
          {rightComponent ? (
            rightComponent
          ) : rightIcon ? (
            <TouchableOpacity style={styles.iconButton} onPress={onRightPress}>
              <Ionicons name={rightIcon as any} size={24} color="#1f2937" />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconPlaceholder} />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    // Android için özel ayarlar
    ...Platform.select({
      android: {
        elevation: 4,
        paddingTop: 12
      },
      ios: {
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    textAlign: 'left',
    marginLeft: 8
  },
  iconButton: {
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 40,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
});

export default CustomHeader;