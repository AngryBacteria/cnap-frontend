import { useQuery } from "@tanstack/react-query";
import type { MatchDTOSingle } from "../../model/MatchDTO";

export interface ChampionMatchesAPIResponse {
	page: number;
	maxPage: number;
	data: MatchDTOSingle[];
}

export const useChampionMatches = (championId: number, page = 1) => {
	const championMatchesQuery = useQuery({
		queryKey: ["matchesChampion", championId, page],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:8000/matches/champion/${championId}?page=${page}`,
			);
			if (!response.ok) {
				throw new Error("Failed to load champion matches data");
			}

			return (await response.json()) as ChampionMatchesAPIResponse;
		},
	});

	return championMatchesQuery;
};
