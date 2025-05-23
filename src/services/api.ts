// src/services/api.ts
import axios from 'axios';

// Football Data API endpoints
const BASE_URL = 'https://api.football-data.org/v4';
const API_KEY = 'db800fad6d874f4491c83f160c6d5101';
//const API_KEY = 'null';




// API istekleri için temel axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Auth-Token': API_KEY,
    'Content-Type': 'application/json',
  },
});

// Competitions (Ligler)
export const getCompetitions = async () => {
  try {
    const response = await api.get('/competitions');
    return response.data.competitions;
  } catch (error) {
    console.error('Error fetching competitions:', error);
    throw error;
  }
};

// Belirli bir ligin maçları
export const getMatchesByCompetition = async (competitionId: string, dateFrom?: string, dateTo?: string) => {
  try {
    let url = `/competitions/${competitionId}/matches`;

    // İsteğe bağlı tarih filtreleri
    if (dateFrom && dateTo) {
      url += `?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    }

    const response = await api.get(url);
    return response.data.matches;
  } catch (error) {
    console.error(`Error fetching matches for competition ${competitionId}:`, error);
    throw error;
  }
};

// Bugünün maçları
export const getTodayMatches = async () => {
  try {
    // Bugünün tarihini YYYY-MM-DD formatında al
    const today = new Date().toISOString().split('T')[0];

    const response = await api.get(`/matches?dateFrom=${today}&dateTo=${today}`);
    return response.data.matches;
  } catch (error) {
    console.error('Error fetching today\'s matches:', error);
    throw error;
  }
};

// Belirli bir tarih aralığındaki maçlar
export const getMatchesByDateRange = async (dateFrom: string, dateTo: string) => {
  try {
    const response = await api.get(`/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`);
    return response.data.matches;
  } catch (error) {
    console.error('Error fetching matches by date range:', error);
    throw error;
  }
};

// Takım detayları
export const getTeamDetails = async (teamId: number) => {
  try {
    const response = await api.get(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching team details for team ${teamId}:`, error);
    throw error;
  }
};

export default {
  getCompetitions,
  getMatchesByCompetition,
  getTodayMatches,
  getMatchesByDateRange,
  getTeamDetails,
};
