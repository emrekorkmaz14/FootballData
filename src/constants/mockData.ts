// src/constants/mockData.ts

// Lig listesi için örnek veriler
export const mockLeagues = [
    {
      id: 'PL',
      name: 'Premier League',
      country: 'İngiltere',
      logo: 'https://media.api-sports.io/football/leagues/39.png',
      flag: 'https://media.api-sports.io/flags/gb.svg',
    },
    {
      id: 'SA',
      name: 'Serie A',
      country: 'İtalya',
      logo: 'https://media.api-sports.io/football/leagues/135.png',
      flag: 'https://media.api-sports.io/flags/it.svg',
    },
    {
      id: 'BL1',
      name: 'Bundesliga',
      country: 'Almanya',
      logo: 'https://media.api-sports.io/football/leagues/78.png',
      flag: 'https://media.api-sports.io/flags/de.svg',
    },
    {
      id: 'FL1',
      name: 'Ligue 1',
      country: 'Fransa',
      logo: 'https://media.api-sports.io/football/leagues/61.png',
      flag: 'https://media.api-sports.io/flags/fr.svg',
    },
    {
      id: 'PD',
      name: 'LaLiga',
      country: 'İspanya',
      logo: 'https://media.api-sports.io/football/leagues/140.png',
      flag: 'https://media.api-sports.io/flags/es.svg',
    },
    {
      id: 'TSL',
      name: 'Süper Lig',
      country: 'Türkiye',
      logo: 'https://media.api-sports.io/football/leagues/203.png',
      flag: 'https://media.api-sports.io/flags/tr.svg',
    },
    {
      id: 'PPL',
      name: 'Primeira Liga',
      country: 'Portekiz',
      logo: 'https://media.api-sports.io/football/leagues/94.png',
      flag: 'https://media.api-sports.io/flags/pt.svg',
    },
    {
      id: 'NL',
      name: 'Eredivisie',
      country: 'Hollanda',
      logo: 'https://media.api-sports.io/football/leagues/88.png',
      flag: 'https://media.api-sports.io/flags/nl.svg',
    },
  ];
  
  // Popüler ligler (ana sayfadaki ilk bölüm için)
  export const popularLeagues = mockLeagues.slice(0, 5);
  
  // Tüm ligler (Keşfet bölümü için)
  export const allLeagues = mockLeagues;