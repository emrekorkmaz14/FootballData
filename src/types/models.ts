// src/types/models.ts

// Lig (Competition) modeli
export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  area?: {
    name: string;
    flag?: string;
  };
  currentSeason?: {
    startDate: string;
    endDate: string;
    currentMatchday?: number;
  };
}

// Takım modeli
export interface Team {
  id: number;
  name: string;
  shortName?: string;
  tla?: string;
  crest: string; // logo URL
  address?: string;
  website?: string;
  founded?: number;
  clubColors?: string;
  venue?: string;
  coach?: {
    id: number;
    name: string;
    nationality?: string;
  };
}

// Skor modeli
export interface Score {
  winner?: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null;
  duration?: 'REGULAR' | 'EXTRA_TIME' | 'PENALTIES';
  fullTime?: {
    home: number | null;
    away: number | null;
  };
  halfTime?: {
    home: number | null;
    away: number | null;
  };
}

// Maç modeli
export interface Match {
  id: number;
  utcDate: string;
  status: 'SCHEDULED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'SUSPENDED' | 'POSTPONED' | 'CANCELLED' | 'AWARDED';
  matchday?: number;
  stage?: string;
  group?: string;
  lastUpdated: string;
  score: Score;
  homeTeam: {
    id: number;
    name: string;
    shortName?: string;
    tla?: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName?: string;
    tla?: string;
    crest: string;
  };
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
}

// Haber modeli (hala tutuyoruz)
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