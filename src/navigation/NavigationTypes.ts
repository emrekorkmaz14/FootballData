// src/navigation/NavigationTypes.ts

// Bottom Tab Navigator tipleri
export type BottomTabParamList = {
    Home: undefined;
    Matches: undefined;
    Teams: undefined;
    Profile: undefined;
  };
  
  // Ana Stack Navigator tipleri
  export type RootStackParamList = {
    Main: undefined; // Bottom Tab Navigator
    LeagueDetails: { leagueId: string; leagueName: string };
    TeamDetails: { teamId: string; teamName: string };
    MatchDetails: { matchId: string };
  };