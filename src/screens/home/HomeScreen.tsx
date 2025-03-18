// src/screens/home/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
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
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Tipler
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { Competition, Match, News } from '../../types/models';

// API servisi
import { getCompetitions, getMatchesByCompetition, getTodayMatches } from '../../services/api';

// Mock veriler (yedek olarak)
import { mockCompetitions, mockMatches, mockNews } from '../../constants/mockData';

const { width } = Dimensions.get('window');

// Haftanın günleri
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
const currentMonth = today.toLocaleString('default', { month: 'long' });
const currentYear = today.getFullYear();

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // State tanımlamaları
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string | number>('ALL');
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedNewsSource, setSelectedNewsSource] = useState('All');
  const [loading, setLoading] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(false);

  // API'den ligleri çekmek için
  useEffect(() => {
    fetchCompetitions();
  }, []);

  // Seçilen lig değiştiğinde maçları güncelle
  useEffect(() => {
    fetchMatches();
  }, [selectedCompetition]);

  // Seçilen gün değiştiğinde maçları güncelle
  useEffect(() => {
    fetchMatches();
  }, [selectedDay]);

  // Ligleri getir
  const fetchCompetitions = async () => {
    setLoading(true);
    try {
      // API'den ligleri çek
      const competitionsData = await getCompetitions();
      setCompetitions(competitionsData);
    } catch (error) {
      console.error('Error fetching competitions:', error);
      // Hata durumunda mock verileri kullan
      setCompetitions(mockCompetitions);
    } finally {
      setLoading(false);
    }
  };

  // Maçları getir
  const fetchMatches = async () => {
    setLoadingMatches(true);
    try {
      let matchesData;

      // Seçilen tarih için tarih aralığı oluştur
      const selectedDate = new Date(today.getFullYear(), today.getMonth(), selectedDay);
      const dateString = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD formatında

      if (selectedCompetition === 'ALL') {
        // Tüm ligler için o günün maçlarını getir
        matchesData = await getTodayMatches();
      } else {
        // Belirli bir lig için maçları getir
        matchesData = await getMatchesByCompetition(selectedCompetition.toString(), dateString, dateString);
      }

      // Maçları saat sırasına göre sırala
      const sortedMatches = matchesData.sort((a: Match, b: Match) =>
        new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
      );

      setMatches(sortedMatches);
    } catch (error) {
      console.error('Error fetching matches:', error);

      // Hata durumunda mock verileri kullan
      if (selectedCompetition === 'ALL') {
        setMatches(mockMatches);
      } else {
        // Mock verileri filtrele
        const filteredMatches = mockMatches.filter(
          match => match.competition.id === selectedCompetition
        );
        setMatches(filteredMatches);
      }
    } finally {
      setLoadingMatches(false);
    }
  };

  // Ayın günlerini oluştur (bugünden itibaren iki hafta)
  const getDaysInMonth = () => {
    const days = [];
    const currentDate = today.getDate();

    // Bugün ve sonraki 14 gün
    for (let i = 0; i < 15; i++) {
      const day = currentDate + i;
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      const dayOfWeek = weekDays[date.getDay()];
      days.push({ day, dayOfWeek, date });
    }

    return days;
  };

  const days = getDaysInMonth();

  // Maç saatini formatla
  const formatMatchTime = (utcDateString: string) => {
    const date = new Date(utcDateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Maç durumu stilini belirle
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'LIVE':
      case 'IN_PLAY':
        return styles.liveStatus;
      case 'FINISHED':
        return styles.finishedStatus;
      case 'SCHEDULED':
        return styles.scheduledStatus;
      case 'POSTPONED':
      case 'CANCELLED':
        return styles.cancelledStatus;
      default:
        return styles.scheduledStatus;
    }
  };

  // Maç durumu metnini belirle
  const getStatusText = (status: string) => {
    switch (status) {
      case 'LIVE':
      case 'IN_PLAY':
        return 'LIVE';
      case 'PAUSED':
        return 'BREAK';
      case 'FINISHED':
        return 'FINISHED';
      case 'SCHEDULED':
        return 'UPCOMING';
      case 'POSTPONED':
        return 'POSTPONED';
      case 'CANCELLED':
        return 'CANCELLED';
      case 'SUSPENDED':
        return 'SUSPENDED';
      default:
        return status;
    }
  };

  // Haberleri filtrele (seçili kaynağa göre)
  const filteredNews = selectedNewsSource === 'All'
    ? mockNews
    : mockNews.filter(news => news.league.name === selectedNewsSource);

  // Canlı maçları render et
  const renderLiveMatch = (match: Match) => {
    if (!match) return null;

    return (
      <View style={styles.matchCard}>
        <View style={styles.matchTeamsContainer}>
          {/* Home Team */}
          <View style={styles.teamLeftContainer}>
            <Image
              source={{ uri: match.homeTeam.crest }}
              style={styles.teamLogo}
              resizeMode="contain"
            />
          </View>

          {/* Away Team */}
          <View style={styles.teamRightContainer}>
            <Image
              source={{ uri: match.awayTeam.crest }}
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
                source={{ uri: match.competition.emblem }}
                style={styles.leagueLogoSmall}
                resizeMode="contain"
              />
              <Text style={styles.teamShortName}>{match.homeTeam.tla || match.homeTeam.shortName}</Text>
              <Text style={styles.vsText}>vs</Text>
              <Text style={styles.teamShortName}>{match.awayTeam.tla || match.awayTeam.shortName}</Text>
            </View>
            <Text style={styles.matchDate}>
              {new Date(match.utcDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{match.score.fullTime?.home ?? 0}</Text>
            <Text style={styles.scoreSeparator}>:</Text>
            <Text style={styles.scoreText}>{match.score.fullTime?.away ?? 0}</Text>
          </View>

          <View style={styles.watchNowContainer}>
            <TouchableOpacity style={styles.watchNowButton}>
              <Text style={styles.watchNowText}>Watch Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Maç listesini render et
  const renderMatchItem = (match: Match) => {
    return (
      <TouchableOpacity key={match.id} style={styles.matchListItem}>
        <View style={styles.matchItemHeader}>
          <View style={styles.leagueInfo}>
            <Image
              source={{ uri: match.competition.emblem }}
              style={styles.matchLeagueLogo}
              resizeMode="contain"
            />
            <Text style={styles.matchLeagueName}>{match.competition.name}</Text>
          </View>
          <View style={[styles.matchStatusBadge, getStatusStyle(match.status)]}>
            <Text style={styles.matchStatusText}>{getStatusText(match.status)}</Text>
          </View>
        </View>

        <View style={styles.matchTeamRow}>
          {/* Home Team */}
          <View style={styles.matchTeamInfo}>
            <Image
              source={{ uri: match.homeTeam.crest }}
              style={styles.matchTeamLogo}
              resizeMode="contain"
            />
            <Text style={styles.matchTeamName} numberOfLines={1}>
              {match.homeTeam.shortName || match.homeTeam.name}
            </Text>
          </View>

          {/* Score/Time */}
          <View style={styles.matchScoreContainer}>
            {match.status === 'SCHEDULED' ? (
              <Text style={styles.matchTimeText}>{formatMatchTime(match.utcDate)}</Text>
            ) : (
              <View style={styles.matchScoreBoard}>
                <Text style={[
                  styles.matchScoreText,
                  (match.status === 'LIVE' || match.status === 'IN_PLAY') && styles.liveScoreText
                ]}>
                  {match.score.fullTime?.home ?? '-'}
                </Text>
                <Text style={[
                  styles.matchScoreSeparator,
                  (match.status === 'LIVE' || match.status === 'IN_PLAY') && styles.liveScoreText
                ]}>:</Text>
                <Text style={[
                  styles.matchScoreText,
                  (match.status === 'LIVE' || match.status === 'IN_PLAY') && styles.liveScoreText
                ]}>
                  {match.score.fullTime?.away ?? '-'}
                </Text>
              </View>
            )}
          </View>

          {/* Away Team */}
          <View style={styles.matchTeamInfo}>
            <Image
              source={{ uri: match.awayTeam.crest }}
              style={styles.matchTeamLogo}
              resizeMode="contain"
            />
            <Text style={styles.matchTeamName} numberOfLines={1}>
              {match.awayTeam.shortName || match.awayTeam.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Canlı maçları filtrele
  const liveMatches = matches.filter(match =>
    match.status === 'LIVE' || match.status === 'IN_PLAY'
  );

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

      {/* Competitions Scrollbar */}
      <View style={styles.competitionsContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#6366f1" />
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.competitionsScrollContent}
          >
            {/* ALL option */}
            <TouchableOpacity
              style={[
                styles.competitionItem,
                selectedCompetition === 'ALL' && styles.competitionItemSelected
              ]}
              onPress={() => setSelectedCompetition('ALL')}
            >
              <View style={[
                styles.competitionLogoContainer,
                selectedCompetition === 'ALL' && styles.competitionLogoContainerSelected
              ]}>
                <Ionicons
                  name="football-outline"
                  size={24}
                  color={selectedCompetition === 'ALL' ? '#ffffff' : '#6366f1'}
                />
              </View>
              <Text style={[
                styles.competitionName,
                selectedCompetition === 'ALL' && styles.competitionNameSelected
              ]}>
                All
              </Text>
            </TouchableOpacity>

            {/* Competition list */}
            {competitions.map((competition) => (
              <TouchableOpacity
                key={competition.id}
                style={[
                  styles.competitionItem,
                  selectedCompetition === competition.id && styles.competitionItemSelected
                ]}
                onPress={() => setSelectedCompetition(competition.id)}
              >
                <View style={[
                  styles.competitionLogoContainer,
                  selectedCompetition === competition.id && styles.competitionLogoContainerSelected
                ]}>
                  <Image
                    source={{ uri: competition.emblem }}
                    style={styles.competitionLogo}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[
                  styles.competitionName,
                  selectedCompetition === competition.id && styles.competitionNameSelected
                ]}>
                  {competition.code || competition.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Live Match Section */}
        {liveMatches.length > 0 && (
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
              {liveMatches.map(match => renderLiveMatch(match))}
            </ScrollView>
          </View>
        )}

        {/* Matches Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Matches</Text>
          </View>

          {loadingMatches ? (
            <View style={styles.loadingMatchesContainer}>
              <ActivityIndicator size="large" color="#6366f1" />
              <Text style={styles.loadingText}>Loading matches...</Text>
            </View>
          ) : matches.length > 0 ? (
            <View style={styles.matchesList}>
              {matches.map(match => renderMatchItem(match))}
            </View>
          ) : (
            <View style={styles.emptyMatchesContainer}>
              <Ionicons name="football-outline" size={48} color="#d1d5db" />
              <Text style={styles.emptyText}>No matches found for this day</Text>
            </View>
          )}
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
            {mockCompetitions.slice(0, 5).map((league: Competition) => (
              <TouchableOpacity
                key={league.id.toString()}
                style={styles.newsSourceItem}
                onPress={() => setSelectedNewsSource(league.name)}
              >
                <View style={[
                  styles.newsSourceContainer,
                  selectedNewsSource === league.name ? styles.newsSourceActive : styles.newsSourceInactive
                ]}>
                  <Image
                    source={{ uri: league.emblem }}
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

  // Competitions
  competitionsContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  competitionsScrollContent: {
    paddingHorizontal: 16,
  },
  competitionItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  competitionItemSelected: {
    opacity: 1,
  },
  competitionLogoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  competitionLogoContainerSelected: {
    backgroundColor: '#6366f1',
  },
  competitionLogo: {
    width: 30,
    height: 30,
  },
  competitionName: {
    fontSize: 12,
    color: '#6b7280',
  },
  competitionNameSelected: {
    color: '#6366f1',
    fontWeight: '600',
  },

  // Calendar Section
  calendarSection: {
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
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
  todayText: {
    color: '#6366f1',
    fontWeight: 'bold',
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
    marginTop: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  scoreSeparator: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6b7280',
    marginHorizontal: 8,
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

  // Matches List
  matchesList: {
    paddingHorizontal: 16,
  },
  matchListItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  matchItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leagueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchLeagueLogo: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  matchLeagueName: {
    fontSize: 12,
    color: '#6b7280',
  },
  matchStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  matchStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1f2937',
  },
  matchTeamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchTeamInfo: {
    flex: 2,
    alignItems: 'center',
  },
  matchTeamLogo: {
    width: 36,
    height: 36,
    marginBottom: 6,
  },
  matchTeamName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
  },
  matchScoreContainer: {
    flex: 1,
    alignItems: 'center',
  },
  matchTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  matchScoreBoard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  matchScoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  matchScoreSeparator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b7280',
    marginHorizontal: 4,
  },
  liveScoreText: {
    color: '#ef4444',
  },
  liveStatus: {
    backgroundColor: '#fee2e2',
  },
  finishedStatus: {
    backgroundColor: '#f3f4f6',
  },
  scheduledStatus: {
    backgroundColor: '#e0f2fe',
  },
  cancelledStatus: {
    backgroundColor: '#fef3c7',
  },
  loadingMatchesContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6b7280',
  },
  emptyMatchesContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 12,
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