// src/components/home/HomeHeader.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import {
  BellAlertIcon,
  BellIcon,
  CalendarDaysIcon,
} from "react-native-heroicons/outline";
import { SignalIcon } from 'react-native-heroicons/solid';
import colors from '../../constants/colors';

interface HomeHeaderProps {
  username: string;
  avatarUrl: string;
  onSearchPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  username,
  avatarUrl,
  onSearchPress,
}) => {
  // Get current date and format it
  const getCurrentDate = () => {
    const date = new Date();
    // Format options for the date
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f9fafb"
        translucent={false}
      />
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatar}
          />
          <View style={styles.welcomeTextContainer}>
            <View style={styles.hiContainer}>
              <Text style={styles.hiText}>Welcome </Text>
              <Text style={styles.userName}>{username}</Text>
              <Text style={styles.waveEmoji}>👋</Text>
            </View>
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onSearchPress}
          >
            <CalendarDaysIcon color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onSearchPress}
          >
            <BellIcon color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  welcomeTextContainer: {
    marginLeft: 12,
  },
  hiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiText: {
    fontSize: 14,
    color: '#6b7280',
  },
  dateText: {
    fontSize: 14,
    color: '#6b7280',
  },
  waveEmoji: {
    marginLeft: 4,
    fontSize: 14,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
    padding: 4,
  },
});

export default HomeHeader;