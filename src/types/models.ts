// src/types/models.ts

// Lig modeli
export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  flag: string;
}

// Takım modeli
export interface Team {
  id: string;
  name: string;
  shortName?: string;
  logo: string;
  country?: string;
  founded?: number;
  stadium?: string;
}

// Maç modeli
export interface Match {
  id: string;
  date: string;
  time: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'CANCELLED' | 'POSTPONED';
  homeTeam: {
    id: string;
    name: string;
    logo: string;
    score?: number;
  };
  awayTeam: {
    id: string;
    name: string;
    logo: string;
    score?: number;
  };
  league: {
    id: string;
    name: string;
    logo: string;
  };
}

// Haber modeli
export interface News {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  league: {
    id: string;
    name: string;
    logo: string;
  };
}