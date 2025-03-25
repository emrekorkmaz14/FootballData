// src/screens/teams/TeamsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import CustomHeader from '../../components/common/CustomHeader';

// Örnek takım verileri
const teamsData = [
  {
    id: '1',
    name: 'Arsenal',
    country: 'England',
    league: 'Premier League',
    logo: 'https://media.api-sports.io/football/teams/42.png',
    founded: 1886,
    stadium: 'Emirates Stadium',
    isFavorite: true
  },
  {
    id: '2',
    name: 'Manchester United',
    country: 'England',
    league: 'Premier League',
    logo: 'https://media.api-sports.io/football/teams/33.png',
    founded: 1878,
    stadium: 'Old Trafford',
    isFavorite: false
  },
  {
    id: '3',
    name: 'Liverpool',
    country: 'England',
    league: 'Premier League',
    logo: 'https://media.api-sports.io/football/teams/40.png',
    founded: 1892,
    stadium: 'Anfield',
    isFavorite: false
  },
  {
    id: '4',
    name: 'Chelsea',
    country: 'England',
    league: 'Premier League',
    logo: 'https://media.api-sports.io/football/teams/49.png',
    founded: 1905,
    stadium: 'Stamford Bridge',
    isFavorite: false
  },
  {
    id: '5',
    name: 'Manchester City',
    country: 'England',
    league: 'Premier League',
    logo: 'https://media.api-sports.io/football/teams/50.png',
    founded: 1880,
    stadium: 'Etihad Stadium',
    isFavorite: false
  },
  {
    id: '6',
    name: 'Tottenham Hotspur',
    country: 'England',
    league: 'Premier League',
    logo: 'https://media.api-sports.io/football/teams/47.png',
    founded: 1882,
    stadium: 'Tottenham Hotspur Stadium',
    isFavorite: false
  },
  {
    id: '7',
    name: 'Fenerbahçe',
    country: 'Turkey',
    league: 'Süper Lig',
    logo: 'https://media.api-sports.io/football/teams/611.png',
    founded: 1907,
    stadium: 'Ülker Stadyumu',
    isFavorite: false
  },
  {
    id: '8',
    name: 'Galatasaray',
    country: 'Turkey',
    league: 'Süper Lig',
    logo: 'https://media.api-sports.io/football/teams/645.png',
    founded: 1905,
    stadium: 'Rams Park',
    isFavorite: false
  },
  {
    id: '9',
    name: 'Beşiktaş',
    country: 'Turkey',
    league: 'Süper Lig',
    logo: 'https://media.api-sports.io/football/teams/549.png',
    founded: 1903,
    stadium: 'Vodafone Park',
    isFavorite: false
  },
  {
    id: '10',
    name: 'Real Madrid',
    country: 'Spain',
    league: 'La Liga',
    logo: 'https://media.api-sports.io/football/teams/541.png',
    founded: 1902,
    stadium: 'Santiago Bernabéu',
    isFavorite: false
  },
  {
    id: '11',
    name: 'Barcelona',
    country: 'Spain',
    league: 'La Liga',
    logo: 'https://media.api-sports.io/football/teams/529.png',
    founded: 1899,
    stadium: 'Camp Nou',
    isFavorite: false
  },
  {
    id: '12',
    name: 'Atlético Madrid',
    country: 'Spain',
    league: 'La Liga',
    logo: 'https://media.api-sports.io/football/teams/530.png',
    founded: 1903,
    stadium: 'Wanda Metropolitano',
    isFavorite: false
  },
  {
    id: '13',
    name: 'Sevilla',
    country: 'Spain',
    league: 'La Liga',
    logo: 'https://media.api-sports.io/football/teams/536.png',
    founded: 1890,
    stadium: 'Ramón Sánchez Pizjuán',
    isFavorite: false
  },
  {
    id: '14',
    name: 'Valencia',
    country: 'Spain',
    league: 'La Liga',
    logo: 'https://media.api-sports.io/football/teams/532.png',
    founded: 1919,
    stadium: 'Mestalla',
    isFavorite: false
  },
  {
    id: '15',
    name: 'Juventus',
    country: 'Italy',
    league: 'Serie A',
    logo: 'https://media.api-sports.io/football/teams/496.png',
    founded: 1897,
    stadium: 'Allianz Stadium',
    isFavorite: false
  },
  {
    id: '16',
    name: 'AC Milan',
    country: 'Italy',
    league: 'Serie A',
    logo: 'https://media.api-sports.io/football/teams/489.png',
    founded: 1899,
    stadium: 'San Siro',
    isFavorite: false
  },
  {
    id: '17',
    name: 'Inter Milan',
    country: 'Italy',
    league: 'Serie A',
    logo: 'https://media.api-sports.io/football/teams/505.png',
    founded: 1908,
    stadium: 'San Siro',
    isFavorite: false
  },
  {
    id: '18',
    name: 'Napoli',
    country: 'Italy',
    league: 'Serie A',
    logo: 'https://media.api-sports.io/football/teams/492.png',
    founded: 1926,
    stadium: 'Diego Armando Maradona',
    isFavorite: false
  },
  {
    id: '19',
    name: 'AS Roma',
    country: 'Italy',
    league: 'Serie A',
    logo: 'https://media.api-sports.io/football/teams/497.png',
    founded: 1927,
    stadium: 'Stadio Olimpico',
    isFavorite: false
  },
  {
    id: '20',
    name: 'Lazio',
    country: 'Italy',
    league: 'Serie A',
    logo: 'https://media.api-sports.io/football/teams/487.png',
    founded: 1900,
    stadium: 'Stadio Olimpico',
    isFavorite: false
  },
  {
    id: '21',
    name: 'Bayern Munich',
    country: 'Germany',
    league: 'Bundesliga',
    logo: 'https://media.api-sports.io/football/teams/157.png',
    founded: 1900,
    stadium: 'Allianz Arena',
    isFavorite: false
  },
  {
    id: '22',
    name: 'Borussia Dortmund',
    country: 'Germany',
    league: 'Bundesliga',
    logo: 'https://media.api-sports.io/football/teams/165.png',
    founded: 1909,
    stadium: 'Signal Iduna Park',
    isFavorite: false
  },
  {
    id: '23',
    name: 'RB Leipzig',
    country: 'Germany',
    league: 'Bundesliga',
    logo: 'https://media.api-sports.io/football/teams/173.png',
    founded: 2009,
    stadium: 'Red Bull Arena',
    isFavorite: false
  },
  {
    id: '24',
    name: 'Bayer Leverkusen',
    country: 'Germany',
    league: 'Bundesliga',
    logo: 'https://media.api-sports.io/football/teams/168.png',
    founded: 1904,
    stadium: 'BayArena',
    isFavorite: false
  },
  {
    id: '25',
    name: 'Eintracht Frankfurt',
    country: 'Germany',
    league: 'Bundesliga',
    logo: 'https://media.api-sports.io/football/teams/169.png',
    founded: 1899,
    stadium: 'Deutsche Bank Park',
    isFavorite: false
  },
  {
    id: '26',
    name: 'Paris Saint-Germain',
    country: 'France',
    league: 'Ligue 1',
    logo: 'https://media.api-sports.io/football/teams/85.png',
    founded: 1970,
    stadium: 'Parc des Princes',
    isFavorite: false
  },
  {
    id: '27',
    name: 'Olympique Marseille',
    country: 'France',
    league: 'Ligue 1',
    logo: 'https://media.api-sports.io/football/teams/81.png',
    founded: 1899,
    stadium: 'Orange Vélodrome',
    isFavorite: false
  },
  {
    id: '28',
    name: 'Olympique Lyonnais',
    country: 'France',
    league: 'Ligue 1',
    logo: 'https://media.api-sports.io/football/teams/80.png',
    founded: 1950,
    stadium: 'Groupama Stadium',
    isFavorite: false
  },
  {
    id: '29',
    name: 'AS Monaco',
    country: 'France',
    league: 'Ligue 1',
    logo: 'https://media.api-sports.io/football/teams/91.png',
    founded: 1924,
    stadium: 'Stade Louis II',
    isFavorite: false
  },
  {
    id: '30',
    name: 'Lille OSC',
    country: 'France',
    league: 'Ligue 1',
    logo: 'https://media.api-sports.io/football/teams/79.png',
    founded: 1944,
    stadium: 'Stade Pierre-Mauroy',
    isFavorite: false
  },
  {
    id: '31',
    name: 'Leicester City',
    country: 'England',
    league: 'Premier League',
    logo: 'https://media.api-sports.io/football/teams/46.png',
    founded: 1884,
    stadium: 'King Power Stadium',
    isFavorite: false
  },
  {
    id: '32',
    name: 'West Ham United',
    country: 'England',
    league: 'Premier League',
    logo: 'https://media.api-sports.io/football/teams/48.png',
    founded: 1895,
    stadium: 'London Stadium',
    isFavorite: false
  },
  {
    id: '33',
    name: 'Everton',
    country: 'England',
    league: 'Premier League',
    logo: 'https://media.api-sports.io/football/teams/45.png',
    founded: 1878,
    stadium: 'Goodison Park',
    isFavorite: false
  },
  {
    id: '34',
    name: 'Aston Villa',
    country: 'England',
    league: 'Premier League',
    logo: 'https://media.api-sports.io/football/teams/66.png',
    founded: 1874,
    stadium: 'Villa Park',
    isFavorite: false
  },
  {
    id: '35',
    name: 'Newcastle United',
    country: 'England',
    league: 'Premier League',
    logo: 'https://media.api-sports.io/football/teams/34.png',
    founded: 1892,
    stadium: 'St. James Park',
    isFavorite: false
  },
  {
    id: '36',
    name: 'Athletic Bilbao',
    country: 'Spain',
    league: 'La Liga',
    logo: 'https://media.api-sports.io/football/teams/531.png',
    founded: 1898,
    stadium: 'San Mamés',
    isFavorite: false
  },
  {
    id: '37',
    name: 'Real Sociedad',
    country: 'Spain',
    league: 'La Liga',
    logo: 'https://media.api-sports.io/football/teams/548.png',
    founded: 1909,
    stadium: 'Reale Arena',
    isFavorite: false
  },
  {
    id: '38',
    name: 'Villarreal',
    country: 'Spain',
    league: 'La Liga',
    logo: 'https://media.api-sports.io/football/teams/533.png',
    founded: 1923,
    stadium: 'Estadio de la Cerámica',
    isFavorite: false
  },
  {
    id: '39',
    name: 'Atalanta',
    country: 'Italy',
    league: 'Serie A',
    logo: 'https://media.api-sports.io/football/teams/499.png',
    founded: 1907,
    stadium: 'Gewiss Stadium',
    isFavorite: false
  },
  {
    id: '40',
    name: 'Fiorentina',
    country: 'Italy',
    league: 'Serie A',
    logo: 'https://media.api-sports.io/football/teams/502.png',
    founded: 1926,
    stadium: 'Artemio Franchi',
    isFavorite: false
  },
  {
    id: '41',
    name: 'Bologna',
    country: 'Italy',
    league: 'Serie A',
    logo: 'https://media.api-sports.io/football/teams/500.png',
    founded: 1909,
    stadium: 'Renato Dall Ara',
    isFavorite: false
  },
  {
    id: '42',
    name: 'VfB Stuttgart',
    country: 'Germany',
    league: 'Bundesliga',
    logo: 'https://media.api-sports.io/football/teams/162.png',
    founded: 1893,
    stadium: 'Mercedes-Benz Arena',
    isFavorite: false
  },
  {
    id: '43',
    name: 'Borussia Mönchengladbach',
    country: 'Germany',
    league: 'Bundesliga',
    logo: 'https://media.api-sports.io/football/teams/163.png',
    founded: 1900,
    stadium: 'Borussia-Park',
    isFavorite: false
  },
  {
    id: '44',
    name: 'VfL Wolfsburg',
    country: 'Germany',
    league: 'Bundesliga',
    logo: 'https://media.api-sports.io/football/teams/161.png',
    founded: 1945,
    stadium: 'Volkswagen Arena',
    isFavorite: false
  },
  {
    id: '45',
    name: 'Nice',
    country: 'France',
    league: 'Ligue 1',
    logo: 'https://media.api-sports.io/football/teams/84.png',
    founded: 1904,
    stadium: 'Allianz Riviera',
    isFavorite: false
  },
  {
    id: '46',
    name: 'Stade Rennais',
    country: 'France',
    league: 'Ligue 1',
    logo: 'https://media.api-sports.io/football/teams/94.png',
    founded: 1901,
    stadium: 'Roazhon Park',
    isFavorite: false
  },
  {
    id: '47',
    name: 'RC Lens',
    country: 'France',
    league: 'Ligue 1',
    logo: 'https://media.api-sports.io/football/teams/116.png',
    founded: 1906,
    stadium: 'Stade Bollaert-Delelis',
    isFavorite: false
  },
  {
    id: '48',
    name: 'Schalke 04',
    country: 'Germany',
    league: 'Bundesliga',
    logo: 'https://media.api-sports.io/football/teams/174.png',
    founded: 1904,
    stadium: 'Veltins-Arena',
    isFavorite: false
  },
  {
    id: '49',
    name: 'PSV Eindhoven',
    country: 'Netherlands',
    league: 'Eredivisie',
    logo: 'https://media.api-sports.io/football/teams/197.png',
    founded: 1913,
    stadium: 'Philips Stadion',
    isFavorite: false
  },
  {
    id: '50',
    name: 'Ajax',
    country: 'Netherlands',
    league: 'Eredivisie',
    logo: 'https://media.api-sports.io/football/teams/194.png',
    founded: 1900,
    stadium: 'Johan Cruyff Arena',
    isFavorite: false
  }
];

// Kategori seçenekleri
const categories = ['All Teams', 'Favorites', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'];

const TeamsScreen = () => {
  const [activeCategory, setActiveCategory] = useState('All Teams');
  const [searchText, setSearchText] = useState('');
  const [teamsList, setTeamsList] = useState(teamsData);

  // Kategori değiştirme fonksiyonu
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    // Kategori filtresi uygula
    if (category === 'All Teams') {
      setTeamsList(teamsData);
    } else if (category === 'Favorites') {
      setTeamsList(teamsData.filter(team => team.isFavorite));
    } else {
      setTeamsList(teamsData.filter(team => team.league === category));
    }
  };

  // Arama fonksiyonu
  const handleSearch = (text: string) => {
    setSearchText(text);

    // Boş arama kutusu ise, aktif kategoriye göre listele
    if (text.trim() === '') {
      handleCategoryChange(activeCategory);
      return;
    }

    // Arama metnine göre filtreleme
    const filteredTeams = teamsData.filter(team =>
      team.name.toLowerCase().includes(text.toLowerCase()) ||
      team.country.toLowerCase().includes(text.toLowerCase())
    );

    setTeamsList(filteredTeams);
  };

  // Favori değiştirme fonksiyonu (örnek işlev)
  const toggleFavorite = (teamId: string) => {
    const updatedTeams = teamsList.map(team => {
      if (team.id === teamId) {
        return { ...team, isFavorite: !team.isFavorite };
      }
      return team;
    });

    setTeamsList(updatedTeams);
  };

  // Takım tipi tanımı
  interface TeamType {
    id: string;
    name: string;
    country: string;
    league: string;
    logo: string;
    founded: number;
    stadium: string;
    isFavorite: boolean;
  }

  // Takım kartı render fonksiyonu
  const renderTeamItem = ({ item }: { item: TeamType }) => (
    <View style={styles.teamCard}>
      <View style={styles.teamHeader}>
        <Image
          source={{ uri: item.logo }}
          style={styles.teamLogo}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={item.isFavorite ? "#ef4444" : "#9ca3af"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.teamInfo}>
        <Text style={styles.teamName}>{item.name}</Text>
        <View style={styles.teamDetail}>
          <Ionicons name="location-outline" size={14} color="#6b7280" />
          <Text style={styles.teamDetailText}>{item.country}</Text>
        </View>
        <View style={styles.teamDetail}>
          <Ionicons name="football-outline" size={14} color="#6b7280" />
          <Text style={styles.teamDetailText}>{item.league}</Text>
        </View>
      </View>

      <View style={styles.teamFooter}>
        <TouchableOpacity style={styles.teamButton}>
          <Text style={styles.teamButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Sağ üst köşe butonu için özel bileşen
  const FavoriteFilterButton = () => (
    <TouchableOpacity style={styles.favoriteFilterButton}>
      <Ionicons name="heart" size={22} color="#ef4444" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header - her iki platform için tutarlı */}
      <CustomHeader 
        title="Teams" 
        rightIcon="heart"
        onRightPress={() => console.log('Favorites filter pressed')}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search teams..."
            placeholderTextColor="#9ca3af"
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSearch('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                activeCategory === category && styles.activeCategoryTab
              ]}
              onPress={() => handleCategoryChange(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.activeCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Teams Grid */}
      <FlatList
        data={teamsList}
        renderItem={renderTeamItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.teamsGridContent}
        columnWrapperStyle={styles.teamsRow}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="football-outline" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>No teams found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    ...Platform.select({
      android: {
        paddingTop: 0, // Android için padding ayarı yok
      }
    })
  },
  favoriteFilterButton: {
    padding: 8
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1f2937'
  },
  clearButton: {
    padding: 4
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  categoriesScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  categoryTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 100,
    backgroundColor: '#f3f4f6'
  },
  activeCategoryTab: {
    backgroundColor: colors.primary
  },
  categoryText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500'
  },
  activeCategoryText: {
    color: '#ffffff',
    fontWeight: '600'
  },
  teamsGridContent: {
    padding: 10,
    paddingBottom: 100,
  },
  teamsRow: {
    justifyContent: 'space-between'
  },
  teamCard: {
    backgroundColor: colors.card_background,
    borderRadius: 12,
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
    borderWidth: 1, 
    borderColor: colors.border,
  },
  teamHeader: {
    padding: 12,
    alignItems: 'center',
    position: 'relative'
  },
  teamLogo: {
    width: 80,
    height: 80
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  teamInfo: {
    padding: 12
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center'
  },
  teamDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  teamDetailText: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 6
  },
  teamFooter: {
    padding: 12,
    alignItems: 'center'
  },
  teamButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6
  },
  teamButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 12
  }
});

export default TeamsScreen;