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
  StyleSheet,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Tipler
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { League, News } from '../../types/models';

// Mock veriler
import { popularLeagues, allLeagues, mockNews } from '../../constants/mockData';
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
  const [selectedNewsSource, setSelectedNewsSource] = useState('All');

  // Ayın günlerini oluştur (15-22 arası)
  const getDaysInMonth = () => {
    const days = [];

    for (let i = 7; i <= 30; i++) {
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

  // Haberleri filtrele (seçili kaynağa göre)
  const filteredNews = selectedNewsSource === 'All'
    ? mockNews
    : mockNews.filter(news => news.league.name === selectedNewsSource);

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
            <View style={styles.matchCard}>
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
            </View>
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
            {/* All option */}
            <TouchableOpacity
              style={styles.newsSourceItem}
              onPress={() => setSelectedNewsSource('All')}
            >
              <View style={[
                styles.newsSourceContainer,
                selectedNewsSource === 'All' ? styles.newsSourceActive : styles.newsSourceInactive
              ]}>
                <Text style={[
                  styles.allSourceText,
                  selectedNewsSource === 'All' ? styles.allSourceTextActive : styles.allSourceTextInactive
                ]}>All</Text>
              </View>
            </TouchableOpacity>

            {/* League sources */}
            {allLeagues.slice(0, 5).map((league) => (
              <TouchableOpacity
                key={league.id}
                style={styles.newsSourceItem}
                onPress={() => setSelectedNewsSource(league.name)}
              >
                <View style={[
                  styles.newsSourceContainer,
                  selectedNewsSource === league.name ? styles.newsSourceActive : styles.newsSourceInactive
                ]}>
                  <Image
                    source={{ uri: league.logo }}
                    style={styles.newsSourceLogo}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* News List */}
          <View style={styles.newsListContainer}>
            {filteredNews.map((news, index) => (
              <TouchableOpacity key={news.id} style={[
                styles.newsCard,
                index < filteredNews.length - 1 && styles.newsCardWithMargin
              ]}>
                <Image
                  source={{ uri: news.image }}
                  style={styles.newsImage}
                  resizeMode="contain"
                />
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle} numberOfLines={2}>
                    {news.title}
                  </Text>
                  <Text style={styles.newsExcerpt} numberOfLines={2}>
                    {news.excerpt}
                  </Text>
                  <View style={styles.newsFooter}>
                    <Image
                      source={{ uri: news.league.logo }}
                      style={styles.newsLeagueLogo}
                      resizeMode="contain"
                    />
                    <Text style={styles.newsSource}>{news.league.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {filteredNews.length === 0 && (
              <View style={styles.emptyNewsContainer}>
                <Ionicons name="newspaper-outline" size={48} color="#d1d5db" />
                <Text style={styles.emptyNewsText}>No news found</Text>
              </View>
            )}
          </View>
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
    marginBottom: 16,
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
    color: '#6366f1',
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
    elevation: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  matchTeamsContainer: {
    flexDirection: 'row',
    height: 150,
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
    width: 100,
    height: 100,
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
  newsSourceContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsSourceActive: {
    backgroundColor: 'black',
  },
  newsSourceInactive: {
    backgroundColor: '#f3f4f6', // gray-100
  },
  newsSourceLogo: {
    width: 28,
    height: 28,
  },
  allSourceText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  allSourceTextActive: {
    color: 'white',
  },
  allSourceTextInactive: {
    color: '#4b5563', // gray-600
  },
  newsListContainer: {
    paddingHorizontal: 16,
  },
  newsCard: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  newsCardWithMargin: {
    marginBottom: 12,
  },
  newsImage: {
    width: 110,
    height: 110,
  },
  newsContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
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
  newsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  newsLeagueLogo: {
    width: 14,
    height: 14,
    marginRight: 6,
  },
  newsSource: {
    fontSize: 12,
    color: '#9ca3af', // gray-400
  },
  emptyNewsContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyNewsText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 12,
  },
});

export default HomeScreen;