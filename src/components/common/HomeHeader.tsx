// src/components/home/HomeHeader.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HomeHeaderProps {
  username: string;
  avatarUrl: string;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  username,
  avatarUrl,
  onSearchPress,
  onNotificationPress
}) => {
  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#ffffff" 
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
              <Text style={styles.hiText}>Hi Welcome</Text>
              <Text style={styles.waveEmoji}>👋</Text>
            </View>
            <Text style={styles.userName}>{username}</Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onSearchPress}
          >
            <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onNotificationPress}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
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
  waveEmoji: {
    marginLeft: 4,
    fontSize: 14,
  },
  userName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1f2937',
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