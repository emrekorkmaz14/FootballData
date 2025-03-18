// src/constants/mockData.ts
import { League, News } from '../types/models';

// Lig listesi için örnek veriler
export const mockLeagues: League[] = [
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

// Haberler için örnek veriler
export const mockNews: News[] = [
  {
    id: '1',
    title: "'Genius' Messi keeps scoring goals",
    excerpt: 'Lionel Messi continues to impress fans worldwide with his incredible performances on the field despite age...',
    content: 'Lionel Messi continues to impress fans worldwide with his incredible performances on the field despite age. The Argentine star scored another brilliant free-kick in the last game, bringing his season tally to 15 goals in all competitions.',
    image: 'https://media.api-sports.io/football/players/154.png',
    date: '2024-03-17',
    league: {
      id: 'PL',
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png',
    },
  },
  {
    id: '2',
    title: "Ronaldo reaches career milestone of 900 goals",
    excerpt: 'Cristiano Ronaldo reaches another incredible milestone in his exceptional career, scoring his 900th goal...',
    content: 'Cristiano Ronaldo has reached another incredible milestone in his exceptional career by scoring his 900th goal. The Portuguese superstar achieved this feat with a spectacular overhead kick, adding another highlight to his illustrious career.',
    image: 'https://media.api-sports.io/football/players/874.png',
    date: '2024-03-16',
    league: {
      id: 'PD',
      name: 'LaLiga',
      logo: 'https://media.api-sports.io/football/leagues/140.png',
    },
  },
  {
    id: '3',
    title: "Haaland breaks Premier League record",
    excerpt: 'The Norwegian striker continues his remarkable form, breaking yet another Premier League scoring record...',
    content: 'Erling Haaland has broken yet another Premier League record with his scoring streak. The Manchester City striker has now scored in 10 consecutive league matches, surpassing the previous record held by Jamie Vardy.',
    image: 'https://media.api-sports.io/football/players/1100.png',
    date: '2024-03-15',
    league: {
      id: 'PL',
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png',
    },
  },
  {
    id: '4',
    title: "Arsenal targets new striker",
    excerpt: 'Arsenal are reportedly planning to strengthen their attack in the upcoming transfer window with several high-profile targets...',
    content: 'Arsenal are reportedly planning to strengthen their attack in the upcoming transfer window with several high-profile targets. The Gunners have identified three potential signings as they look to bolster their squad for next season.',
    image: 'https://media.api-sports.io/football/teams/42.png',
    date: '2024-03-14',
    league: {
      id: 'PL',
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png',
    },
  },
  {
    id: '5',
    title: "Bayern Munich secure Bundesliga title",
    excerpt: 'Bayern Munich have clinched their 12th consecutive Bundesliga title with three games to spare after a dominant season...',
    content: 'Bayern Munich have clinched their 12th consecutive Bundesliga title with three games to spare after a dominant season. The Bavarian giants secured the championship with a convincing 3-0 victory over their closest rivals.',
    image: 'https://media.api-sports.io/football/teams/157.png',
    date: '2024-03-13',
    league: {
      id: 'BL1',
      name: 'Bundesliga',
      logo: 'https://media.api-sports.io/football/leagues/78.png',
    },
  },
  {
    id: '6',
    title: "Inter Milan extend lead at top of Serie A",
    excerpt: 'Inter Milan have extended their lead at the top of Serie A to eight points after a crucial victory over Juventus...',
    content: 'Inter Milan have extended their lead at the top of Serie A to eight points after a crucial victory over Juventus in the Derby d\'Italia. The Nerazzurri are now clear favorites to win the Scudetto with just seven games remaining.',
    image: 'https://media.api-sports.io/football/teams/505.png',
    date: '2024-03-12',
    league: {
      id: 'SA',
      name: 'Serie A',
      logo: 'https://media.api-sports.io/football/leagues/135.png',
    },
  },
  {
    id: '7',
    title: "PSG prepare for Champions League clash",
    excerpt: 'Paris Saint-Germain are gearing up for their crucial Champions League quarter-final against Manchester City...',
    content: 'Paris Saint-Germain are gearing up for their crucial Champions League quarter-final against Manchester City. Manager Luis Enrique has confirmed that all key players, including Mbappé, are fit and ready for the high-stakes encounter.',
    image: 'https://media.api-sports.io/football/teams/85.png',
    date: '2024-03-11',
    league: {
      id: 'FL1',
      name: 'Ligue 1',
      logo: 'https://media.api-sports.io/football/leagues/61.png',
    },
  },
  {
    id: '8',
    title: "Liverpool announce manager successor",
    excerpt: 'Liverpool have officially announced who will succeed Jürgen Klopp as the club\'s manager from next season...',
    content: 'Liverpool have officially announced who will succeed Jürgen Klopp as the club\'s manager from next season. The new appointment comes after an extensive search process following Klopp\'s decision to step down after nine successful years at Anfield.',
    image: 'https://media.api-sports.io/football/teams/40.png',
    date: '2024-03-10',
    league: {
      id: 'PL',
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png',
    },
  },
];

// Popüler ligler (ana sayfadaki ilk bölüm için)
export const popularLeagues = mockLeagues.slice(0, 5);

// Tüm ligler (Keşfet bölümü için)
export const allLeagues = mockLeagues;