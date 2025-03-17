// src/screens/matches/MatchesScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';

// Tiplerin tanımlanması
// Match tipi tanımı
interface MatchType {
  id: string;
  league: {
    name: string;
    logo: string;
  };
  homeTeam: {
    name: string;
    shortName: string;
    logo: string;
    score: number | null;
  };
  awayTeam: {
    name: string;
    shortName: string;
    logo: string;
    score: number | null;
  };
  time: string;
  status: 'LIVE' | 'SCHEDULED' | 'FINISHED';
}

// DateGroup tipi tanımı
interface DateGroupType {
  date: string;
  matches: MatchType[];
}

// Örnek maç verileri
const matchesByDate: DateGroupType[] = [
  {
    date: 'Today, 15 March',
    matches: [
      {
        id: '1',
        league: {
          name: 'Premier League',
          logo: 'https://media.api-sports.io/football/leagues/39.png'
        },
        homeTeam: {
          name: 'Manchester City',
          shortName: 'MNC',
          logo: 'https://media.api-sports.io/football/teams/50.png',
          score: 2
        },
        awayTeam: {
          name: 'Manchester United',
          shortName: 'MNU',
          logo: 'https://media.api-sports.io/football/teams/33.png',
          score: 1
        },
        time: '90\'',
        status: 'LIVE'
      },
      {
        id: '2',
        league: {
          name: 'La Liga',
          logo: 'https://media.api-sports.io/football/leagues/140.png'
        },
        homeTeam: {
          name: 'Barcelona',
          shortName: 'BAR',
          logo: 'https://media.api-sports.io/football/teams/529.png',
          score: 3
        },
        awayTeam: {
          name: 'Real Madrid',
          shortName: 'RMA',
          logo: 'https://media.api-sports.io/football/teams/541.png',
          score: 2
        },
        time: '67\'',
        status: 'LIVE'
      }
    ]
  },
  {
    date: 'Tomorrow, 16 March',
    matches: [
      {
        id: '3',
        league: {
          name: 'Serie A',
          logo: 'https://media.api-sports.io/football/leagues/135.png'
        },
        homeTeam: {
          name: 'Juventus',
          shortName: 'JUV',
          logo: 'https://media.api-sports.io/football/teams/496.png',
          score: null
        },
        awayTeam: {
          name: 'Inter Milan',
          shortName: 'INT',
          logo: 'https://media.api-sports.io/football/teams/505.png',
          score: null
        },
        time: '20:45',
        status: 'SCHEDULED'
      },
      {
        id: '4',
        league: {
          name: 'Bundesliga',
          logo: 'https://media.api-sports.io/football/leagues/78.png'
        },
        homeTeam: {
          name: 'Bayern Munich',
          shortName: 'BAY',
          logo: 'https://media.api-sports.io/football/teams/157.png',
          score: null
        },
        awayTeam: {
          name: 'Borussia Dortmund',
          shortName: 'DOR',
          logo: 'https://media.api-sports.io/football/teams/165.png',
          score: null
        },
        time: '18:30',
        status: 'SCHEDULED'
      }
    ]
  },
  {
    date: '17 March',
    matches: [
      {
        id: '5',
        league: {
          name: 'Ligue 1',
          logo: 'https://media.api-sports.io/football/leagues/61.png'
        },
        homeTeam: {
          name: 'Paris Saint-Germain',
          shortName: 'PSG',
          logo: 'https://media.api-sports.io/football/teams/85.png',
          score: null
        },
        awayTeam: {
          name: 'Marseille',
          shortName: 'MAR',
          logo: 'https://media.api-sports.io/football/teams/81.png',
          score: null
        },
        time: '20:00',
        status: 'SCHEDULED'
      }
    ]
  }
];

// Tab seçenekleri
const tabs = ['All Matches', 'Live', 'Upcoming', 'Finished'];

const MatchesScreen = () => {
  const [activeTab, setActiveTab] = useState('All Matches');

  // Tab değiştirme fonksiyonu
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Maç kartı içeriği
  const renderMatchCard = (match: MatchType) => {
    const isLive = match.status === 'LIVE';
    const isScheduled = match.status === 'SCHEDULED';
    
    return (
      <TouchableOpacity style={styles.matchCard} key={match.id}>
        <View style={styles.matchHeader}>
          <View style={styles.leagueContainer}>
            <Image 
              source={{ uri: match.league.logo }}
              style={styles.leagueLogo}
              resizeMode="contain"
            />
            <Text style={styles.leagueName}>{match.league.name}</Text>
          </View>
          
          {isLive && (
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          )}
        </View>
        
        <View style={styles.teamsContainer}>
          {/* Home Team */}
          <View style={styles.teamContainer}>
            <Image 
              source={{ uri: match.homeTeam.logo }}
              style={styles.teamLogo}
              resizeMode="contain"
            />
            <Text style={styles.teamName} numberOfLines={1}>
              {match.homeTeam.name}
            </Text>
          </View>
          
          {/* Score or Time */}
          <View style={styles.scoreContainer}>
            {isScheduled ? (
              <Text style={styles.matchTime}>{match.time}</Text>
            ) : (
              <View style={styles.scoreDisplay}>
                <Text style={[styles.scoreText, isLive && styles.scoreTextLive]}>
                  {match.homeTeam.score}
                </Text>
                <Text style={[styles.scoreText, isLive && styles.scoreTextLive]}>
                  -
                </Text>
                <Text style={[styles.scoreText, isLive && styles.scoreTextLive]}>
                  {match.awayTeam.score}
                </Text>
                {isLive && <Text style={styles.matchMinute}>{match.time}</Text>}
              </View>
            )}
          </View>
          
          {/* Away Team */}
          <View style={[styles.teamContainer, styles.awayTeam]}>
            <Image 
              source={{ uri: match.awayTeam.logo }}
              style={styles.teamLogo}
              resizeMode="contain"
            />
            <Text style={styles.teamName} numberOfLines={1}>
              {match.awayTeam.name}
            </Text>
          </View>
        </View>
        
        <View style={styles.matchFooter}>
          <TouchableOpacity style={styles.matchDetailButton}>
            <Text style={styles.matchDetailText}>Match Details</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // Maç gruplarını göster
  const renderMatchGroup = ({ item }: { item: DateGroupType }) => {
    const dateGroup = item;
    
    return (
      <View style={styles.matchGroup}>
        <Text style={styles.dateHeader}>{dateGroup.date}</Text>
        {dateGroup.matches.map(match => renderMatchCard(match))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={22} color="#1f2937" />
        </TouchableOpacity>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => handleTabChange(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Match List */}
      <FlatList
        data={matchesByDate}
        renderItem={renderMatchGroup}
        keyExtractor={(item) => item.date}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.matchListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  filterButton: {
    padding: 8
  },
  tabContainer: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  tabScrollContent: {
    paddingHorizontal: 16
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary
  },
  tabText: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '500'
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600'
  },
  matchListContent: {
    padding: 16
  },
  matchGroup: {
    marginBottom: 24
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12
  },
  matchCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden'
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  leagueContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leagueLogo: {
    width: 20,
    height: 20,
    marginRight: 8
  },
  leagueName: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500'
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2', // light red
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444', // red
    marginRight: 4
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ef4444' // red
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  teamContainer: {
    flex: 2,
    alignItems: 'center'
  },
  awayTeam: {
    alignItems: 'center'
  },
  teamLogo: {
    width: 48,
    height: 48,
    marginBottom: 8
  },
  teamName: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
    textAlign: 'center',
    width: '100%'
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    paddingHorizontal: 4
  },
  scoreTextLive: {
    color: '#ef4444' // red for live scores
  },
  matchTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563'
  },
  matchMinute: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: '500',
    marginTop: 4
  },
  matchFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  matchDetailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  matchDetailText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginRight: 4
  }
});

export default MatchesScreen;