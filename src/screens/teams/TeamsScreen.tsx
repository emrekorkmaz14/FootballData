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
  // ...other team data
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
    padding: 12
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
    borderWidth: 2, 
    borderColor: colors.border,
  },
  teamHeader: {
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
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