// src/constants/mockData.ts
import { Competition, Match, News } from '../types/models';

// Örnek lig verileri (Football Data API formatında)
export const mockCompetitions: Competition[] = [
  {
    id: 2021,
    name: 'Premier League',
    code: 'PL',
    type: 'LEAGUE',
    emblem: 'https://crests.football-data.org/PL.png',
    area: {
      name: 'England',
      flag: 'https://crests.football-data.org/770.svg'
    },
    currentSeason: {
      startDate: '2024-08-16',
      endDate: '2025-05-25',
      currentMatchday: 4
    }
  },
  {
    id: 2014,
    name: 'La Liga',
    code: 'PD',
    type: 'LEAGUE',
    emblem: 'https://crests.football-data.org/PD.png',
    area: {
      name: 'Spain',
      flag: 'https://crests.football-data.org/760.svg'
    },
    currentSeason: {
      startDate: '2024-08-15',
      endDate: '2025-05-24',
      currentMatchday: 4
    }
  },
  {
    id: 2002,
    name: 'Bundesliga',
    code: 'BL1',
    type: 'LEAGUE',
    emblem: 'https://crests.football-data.org/BL1.png',
    area: {
      name: 'Germany',
      flag: 'https://crests.football-data.org/759.svg'
    },
    currentSeason: {
      startDate: '2024-08-23',
      endDate: '2025-05-17',
      currentMatchday: 4
    }
  },
  {
    id: 2019,
    name: 'Serie A',
    code: 'SA',
    type: 'LEAGUE',
    emblem: 'https://crests.football-data.org/SA.png',
    area: {
      name: 'Italy',
      flag: 'https://crests.football-data.org/784.svg'
    },
    currentSeason: {
      startDate: '2024-08-18',
      endDate: '2025-05-25',
      currentMatchday: 4
    }
  },
  {
    id: 2015,
    name: 'Ligue 1',
    code: 'FL1',
    type: 'LEAGUE',
    emblem: 'https://crests.football-data.org/FL1.png',
    area: {
      name: 'France',
      flag: 'https://crests.football-data.org/773.svg'
    },
    currentSeason: {
      startDate: '2024-08-16',
      endDate: '2025-05-18',
      currentMatchday: 4
    }
  },
  {
    id: 2001,
    name: 'UEFA Champions League',
    code: 'CL',
    type: 'CUP',
    emblem: 'https://crests.football-data.org/CL.png',
    currentSeason: {
      startDate: '2024-09-17',
      endDate: '2025-05-31',
      currentMatchday: 1
    }
  },
  {
    id: 2000,
    name: 'FIFA World Cup',
    code: 'WC',
    type: 'CUP',
    emblem: 'https://crests.football-data.org/WC.png'
  }
];

// Örnek maç verileri (Football Data API formatında)
export const mockMatches: Match[] = [
  {
    id: 419138,
    competition: {
      id: 2021,
      name: 'Premier League',
      code: 'PL',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/PL.png'
    },
    utcDate: '2025-03-18T15:00:00Z',
    status: 'SCHEDULED',
    matchday: 29,
    stage: 'REGULAR_SEASON',
    
    lastUpdated: '2025-03-12T08:20:30Z',
    homeTeam: {
      id: 57,
      name: 'Arsenal FC',
      shortName: 'Arsenal',
      tla: 'ARS',
      crest: 'https://crests.football-data.org/57.png'
    },
    awayTeam: {
      id: 61,
      name: 'Chelsea FC',
      shortName: 'Chelsea',
      tla: 'CHE',
      crest: 'https://crests.football-data.org/61.png'
    },
    score: {
      winner: null,
      duration: 'REGULAR',
      fullTime: {
        home: null,
        away: null
      },
      halfTime: {
        home: null,
        away: null
      }
    }
  },
  {
    id: 419139,
    competition: {
      id: 2021,
      name: 'Premier League',
      code: 'PL',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/PL.png'
    },
    utcDate: '2025-03-18T17:30:00Z',
    status: 'SCHEDULED',
    matchday: 29,
    stage: 'REGULAR_SEASON',
    
    lastUpdated: '2025-03-12T08:20:30Z',
    homeTeam: {
      id: 65,
      name: 'Manchester City FC',
      shortName: 'Man City',
      tla: 'MCI',
      crest: 'https://crests.football-data.org/65.png'
    },
    awayTeam: {
      id: 66,
      name: 'Manchester United FC',
      shortName: 'Man United',
      tla: 'MUN',
      crest: 'https://crests.football-data.org/66.png'
    },
    score: {
      winner: null,
      duration: 'REGULAR',
      fullTime: {
        home: null,
        away: null
      },
      halfTime: {
        home: null,
        away: null
      }
    }
  },
  {
    id: 419140,
    competition: {
      id: 2014,
      name: 'La Liga',
      code: 'PD',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/PD.png'
    },
    utcDate: '2025-03-18T20:00:00Z',
    status: 'LIVE',
    matchday: 29,
    stage: 'REGULAR_SEASON',
    
    lastUpdated: '2025-03-18T20:45:00Z',
    homeTeam: {
      id: 86,
      name: 'Real Madrid CF',
      shortName: 'Real Madrid',
      tla: 'RMA',
      crest: 'https://crests.football-data.org/86.png'
    },
    awayTeam: {
      id: 81,
      name: 'FC Barcelona',
      shortName: 'Barcelona',
      tla: 'FCB',
      crest: 'https://crests.football-data.org/81.png'
    },
    score: {
      winner: null,
      duration: 'REGULAR',
      fullTime: {
        home: 2,
        away: 1
      },
      halfTime: {
        home: 1,
        away: 0
      }
    }
  },
  {
    id: 419141,
    competition: {
      id: 2002,
      name: 'Bundesliga',
      code: 'BL1',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/BL1.png'
    },
    utcDate: '2025-03-18T19:30:00Z',
    status: 'IN_PLAY',
    matchday: 26,
    stage: 'REGULAR_SEASON',
    
    lastUpdated: '2025-03-18T20:15:00Z',
    homeTeam: {
      id: 5,
      name: 'FC Bayern München',
      shortName: 'Bayern',
      tla: 'FCB',
      crest: 'https://crests.football-data.org/5.png'
    },
    awayTeam: {
      id: 4,
      name: 'Borussia Dortmund',
      shortName: 'Dortmund',
      tla: 'BVB',
      crest: 'https://crests.football-data.org/4.png'
    },
    score: {
      winner: null,
      duration: 'REGULAR',
      fullTime: {
        home: 1,
        away: 1
      },
      halfTime: {
        home: 0,
        away: 1
      }
    }
  },
  {
    id: 419142,
    competition: {
      id: 2019,
      name: 'Serie A',
      code: 'SA',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/SA.png'
    },
    utcDate: '2025-03-19T19:45:00Z',
    status: 'SCHEDULED',
    matchday: 29,
    stage: 'REGULAR_SEASON',
    
    lastUpdated: '2025-03-12T08:20:30Z',
    homeTeam: {
      id: 109,
      name: 'Juventus FC',
      shortName: 'Juventus',
      tla: 'JUV',
      crest: 'https://crests.football-data.org/109.png'
    },
    awayTeam: {
      id: 108,
      name: 'FC Internazionale Milano',
      shortName: 'Inter',
      tla: 'INT',
      crest: 'https://crests.football-data.org/108.png'
    },
    score: {
      winner: null,
      duration: 'REGULAR',
      fullTime: {
        home: null,
        away: null
      },
      halfTime: {
        home: null,
        away: null
      }
    }
  },
  {
    id: 419143,
    competition: {
      id: 2015,
      name: 'Ligue 1',
      code: 'FL1',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/FL1.png'
    },
    utcDate: '2025-03-19T20:00:00Z',
    status: 'SCHEDULED',
    matchday: 28,
    stage: 'REGULAR_SEASON',
    
    lastUpdated: '2025-03-12T08:20:30Z',
    homeTeam: {
      id: 524,
      name: 'Paris Saint-Germain FC',
      shortName: 'PSG',
      tla: 'PSG',
      crest: 'https://crests.football-data.org/524.png'
    },
    awayTeam: {
      id: 516,
      name: 'Olympique de Marseille',
      shortName: 'Marseille',
      tla: 'OM',
      crest: 'https://crests.football-data.org/516.png'
    },
    score: {
      winner: null,
      duration: 'REGULAR',
      fullTime: {
        home: null,
        away: null
      },
      halfTime: {
        home: null,
        away: null
      }
    }
  },
  {
    id: 419144,
    competition: {
      id: 2001,
      name: 'UEFA Champions League',
      code: 'CL',
      type: 'CUP',
      emblem: 'https://crests.football-data.org/CL.png'
    },
    utcDate: '2025-03-19T20:00:00Z',
    status: 'SCHEDULED',
    stage: 'QUARTER_FINAL',
    lastUpdated: '2025-03-12T08:20:30Z',
    homeTeam: {
      id: 86,
      name: 'Real Madrid CF',
      shortName: 'Real Madrid',
      tla: 'RMA',
      crest: 'https://crests.football-data.org/86.png'
    },
    awayTeam: {
      id: 5,
      name: 'FC Bayern München',
      shortName: 'Bayern',
      tla: 'FCB',
      crest: 'https://crests.football-data.org/5.png'
    },
    score: {
      winner: null,
      duration: 'REGULAR',
      fullTime: {
        home: null,
        away: null
      },
      halfTime: {
        home: null,
        away: null
      }
    }
  },
  {
    id: 419145,
    competition: {
      id: 2001,
      name: 'UEFA Champions League',
      code: 'CL',
      type: 'CUP',
      emblem: 'https://crests.football-data.org/CL.png'
    },
    utcDate: '2025-03-20T20:00:00Z',
    status: 'SCHEDULED',
    stage: 'QUARTER_FINAL',
    lastUpdated: '2025-03-12T08:20:30Z',
    homeTeam: {
      id: 65,
      name: 'Manchester City FC',
      shortName: 'Man City',
      tla: 'MCI',
      crest: 'https://crests.football-data.org/65.png'
    },
    awayTeam: {
      id: 524,
      name: 'Paris Saint-Germain FC',
      shortName: 'PSG',
      tla: 'PSG',
      crest: 'https://crests.football-data.org/524.png'
    },
    score: {
      winner: null,
      duration: 'REGULAR',
      fullTime: {
        home: null,
        away: null
      },
      halfTime: {
        home: null,
        away: null
      }
    }
  },
  {
    id: 419146,
    competition: {
      id: 2021,
      name: 'Premier League',
      code: 'PL',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/PL.png'
    },
    utcDate: '2025-03-18T12:30:00Z',
    status: 'FINISHED',
    matchday: 29,
    stage: 'REGULAR_SEASON',
    lastUpdated: '2025-03-18T14:30:00Z',
    homeTeam: {
      id: 64,
      name: 'Liverpool FC',
      shortName: 'Liverpool',
      tla: 'LIV',
      crest: 'https://crests.football-data.org/64.png'
    },
    awayTeam: {
      id: 73,
      name: 'Tottenham Hotspur FC',
      shortName: 'Tottenham',
      tla: 'TOT',
      crest: 'https://crests.football-data.org/73.png'
    },
    score: {
      winner: 'HOME_TEAM',
      duration: 'REGULAR',
      fullTime: {
        home: 3,
        away: 1
      },
      halfTime: {
        home: 2,
        away: 0
      }
    }
  }
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