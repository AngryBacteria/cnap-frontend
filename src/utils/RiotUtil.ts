import { ChampionReduced } from '../model/GameDataReduced.ts';

export async function getChampionDataReduced(): Promise<ChampionReduced[]> {
  const sessionData = sessionStorage.getItem('championData');
  if (sessionData) {
    return JSON.parse(sessionData) as ChampionReduced[];
  }

  const response = await fetch(
    'http://localhost:8000/static/champions/reduced',
  );
  const data = (await response.json()) as ChampionReduced[];
  if (data && data.length > 0) {
    sessionStorage.setItem('championData', JSON.stringify(data));
    return data;
  } else {
    throw new Error('Failed to load champion data');
  }
}
