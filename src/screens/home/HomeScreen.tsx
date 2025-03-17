// src/screens/home/HomeScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Tipler
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { League } from '../../types/models';

// Mock veriler
import { popularLeagues, allLeagues } from '../../constants/mockData';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

// Haftanın günleri
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
const currentMonth = today.toLocaleString('default', { month: 'long' });
const currentYear = today.getFullYear();

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedDay, setSelectedDay] = useState(17); // Görseldeki gibi 17'yi seçili yap

  // Ayın günlerini oluştur (15-22 arası)
  const getDaysInMonth = () => {
    const days = [];
    
    for (let i = 15; i <= 22; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      const dayOfWeek = weekDays[date.getDay()];
      days.push({ day: i, dayOfWeek });
    }
    
    return days;
  };

  const days = getDaysInMonth();

  const handleLeaguePress = (league: League) => {
    console.log('Seçilen lig:', league.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://ui-avatars.com/api/?name=User&background=c7d2fe&color=4f46e5&size=128' }} 
            style={styles.avatar}
          />
          <View style={styles.welcomeTextContainer}>
            <View style={styles.hiContainer}>
              <Text style={styles.hiText}>Hi Welcome</Text>
              <Text style={styles.waveEmoji}>👋</Text>
            </View>
            <Text style={styles.userName}>Rudolph Schroeder</Text>
          </View>
        </View>
        
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarSection}>
        <View style={styles.monthSelector}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={20} color="#6b7280" />
          </TouchableOpacity>
          <Text style={styles.monthYearText}>{currentMonth} {currentYear}</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
          </TouchableOpacity>
          <View style={styles.calendarIconContainer}>
            <TouchableOpacity>
              <Ionicons name="calendar-outline" size={22} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Days */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysScrollContent}
        >
          {days.map((item) => {
            const isSelected = item.day === selectedDay;
            return (
              <TouchableOpacity 
                key={item.day}
                style={[
                  styles.dayItem, 
                  isSelected && styles.selectedDayItem
                ]}
                onPress={() => setSelectedDay(item.day)}
              >
                <Text style={[
                  styles.dayOfWeek, 
                  isSelected && styles.selectedDayText
                ]}>
                  {item.dayOfWeek}
                </Text>
                <Text style={[
                  styles.dayNumber, 
                  isSelected && styles.selectedDayText
                ]}>
                  {item.day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Live Match Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Live Match</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.matchesScrollContent}
          >
            {/* Manchester Derby Match Card */}
            <TouchableOpacity style={styles.matchCard}>
              <View style={styles.matchTeamsContainer}>
                {/* Left Team - Blue */}
                <View style={styles.teamLeftContainer}>
                  <Image 
                    source={{ uri: 'https://media.api-sports.io/football/teams/50.png' }} 
                    style={styles.teamLogo}
                    resizeMode="contain"
                  />
                </View>
                
                {/* Right Team - Red */}
                <View style={styles.teamRightContainer}>
                  <Image 
                    source={{ uri: 'https://media.api-sports.io/football/teams/33.png' }} 
                    style={styles.teamLogo}
                    resizeMode="contain"
                  />
                  <View style={styles.liveTag}>
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                </View>
              </View>
              
              {/* Bottom Info */}
              <View style={styles.matchInfoContainer}>
                <View style={styles.matchInfoHeader}>
                  <View style={styles.teamsInfoPill}>
                    <Image 
                      source={{ uri: 'https://media.api-sports.io/football/leagues/39.png' }} 
                      style={styles.leagueLogoSmall}
                      resizeMode="contain"
                    />
                    <Text style={styles.teamShortName}>MC</Text>
                    <Text style={styles.vsText}>vs</Text>
                    <Text style={styles.teamShortName}>MU</Text>
                  </View>
                  <Text style={styles.matchDate}>MAR 17, 2024</Text>
                </View>
                
                <View style={styles.watchNowContainer}>
                  <TouchableOpacity style={styles.watchNowButton}>
                    <Text style={styles.watchNowText}>Watch Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Latest News Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest News</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {/* News Sources */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newsSourcesContainer}
          >
            {/* Premier League (active/selected) */}
            <TouchableOpacity style={styles.newsSourceItem}>
              <View style={styles.newsSourceActive}>
                <Image 
                  source={{ uri: 'https://media.api-sports.io/football/leagues/39.png' }}
                  style={styles.newsSourceLogo}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            
            {/* Other league logos */}
            {allLeagues.slice(1, 6).map((league) => (
              <TouchableOpacity key={league.id} style={styles.newsSourceItem}>
                <View style={styles.newsSourceInactive}>
                  <Image 
                    source={{ uri: league.logo }}
                    style={styles.newsSourceLogo}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* News Card - Messi */}
          <TouchableOpacity style={styles.newsCard}>
            <Image 
              source={{ uri: 'https://media.api-sports.io/football/players/154.png' }}
              style={styles.newsImage}
              resizeMode="cover"
            />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>
                'Genius' Messi keeps scoring goals
              </Text>
              <Text style={styles.newsExcerpt} numberOfLines={3}>
                Lionel Messi continues to impress fans worldwide with his incredible performances on the field despite age...
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 15,
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
  },
  
  // Calendar Section
  calendarSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 12,
    color: '#1f2937',
  },
  calendarIconContainer: {
    marginLeft: 'auto',
  },
  daysScrollContent: {
    paddingRight: 16,
  },
  dayItem: {
    alignItems: 'center',
    marginRight: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedDayItem: {
    backgroundColor: '#6366f1', // indigo-500
    borderRadius: 100,
  },
  dayOfWeek: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1f2937',
  },
  selectedDayText: {
    color: 'white',
  },
  
  // Section common
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366f1', // indigo-500
  },
  
  // Match cards
  matchesScrollContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  matchCard: {
    width: width - 32,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  matchTeamsContainer: {
    flexDirection: 'row',
    height: 160,
  },
  teamLeftContainer: {
    flex: 1,
    backgroundColor: '#dbeafe', // light blue
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  teamRightContainer: {
    flex: 1,
    backgroundColor: '#fee2e2', // light red
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  teamLogo: {
    width: 80,
    height: 80,
  },
  liveTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ef4444', // red-500
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  matchInfoContainer: {
    padding: 16,
  },
  matchInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamsInfoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6', // gray-100
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
  },
  leagueLogoSmall: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  teamShortName: {
    fontSize: 12,
    color: '#4b5563', // gray-600
  },
  vsText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 6,
    color: '#4b5563', // gray-600
  },
  matchDate: {
    fontSize: 12,
    color: '#9ca3af', // gray-400
  },
  watchNowContainer: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  watchNowButton: {
    backgroundColor: '#6366f1', // indigo-500
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  watchNowText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  
  // News section
  newsSourcesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  newsSourceItem: {
    marginRight: 12,
  },
  newsSourceActive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsSourceInactive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6', // gray-100
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsSourceLogo: {
    width: 28,
    height: 28,
  },
  newsCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  newsImage: {
    width: 110,
    height: 110,
  },
  newsContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
    marginBottom: 6,
  },
  newsExcerpt: {
    fontSize: 13,
    color: '#6b7280', // gray-500
    lineHeight: 18,
  },
});

export default HomeScreen;