import type { Champion } from "../model/GameData.ts";
import type { ChampionReduced } from "../model/GameDataReduced.ts";

export async function getChampionDataReduced(): Promise<ChampionReduced[]> {
	const sessionData = sessionStorage.getItem("championData");
	if (sessionData) {
		return JSON.parse(sessionData) as ChampionReduced[];
	}

	const response = await fetch(
		"http://localhost:8000/static/champions/reduced",
	);
	const data = (await response.json()) as ChampionReduced[];
	if (data && data.length > 0) {
		sessionStorage.setItem("championData", JSON.stringify(data));
		return data;
	}
	throw new Error("Failed to load champion data");
}

export async function getChampionData(championId: number): Promise<Champion> {
	const response = await fetch(
		`http://localhost:8000/static/champions/${championId}`,
	);
	const data = (await response.json()) as Champion;
	if (data && data.id === championId) {
		return data;
	}
	throw new Error("Failed to load champion data");
}
