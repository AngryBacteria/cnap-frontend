import { Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { ItemDTO } from "../../model/ItemDTO";
import type { MatchDTOSingle } from "../../model/MatchDTO";
import type { QueueDTO } from "../../model/QueueDTO";
import type { SummonerSpellDTO } from "../../model/SummonerSpellDTO";
import { MatchBannerSummary } from "./MatchBannerSummary";

export interface Props {
	championId: number;
}

export function MatchBannerSummaryLoader({ championId }: Props) {
	// TODO pagination
	// TODO filter for only cnap summoners
	// TODO some sort of title

	const championMatchesQuery = useQuery({
		queryKey: ["matchesChampion", championId],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:8000/matches/champion/${championId}`,
			);
			if (!response.ok) {
				throw new Error("Failed to load champion matches data");
			}

			return (await response.json()) as MatchDTOSingle[];
		},
	});

	const itemQuery = useQuery({
		queryKey: ["items"],
		queryFn: async () => {
			const response = await fetch("http://localhost:8000/items");
			if (!response.ok) {
				throw new Error("Failed to load iktem data");
			}

			return (await response.json()) as ItemDTO[];
		},
	});

	const queuesQuery = useQuery({
		queryKey: ["queues"],
		queryFn: async () => {
			const response = await fetch("http://localhost:8000/queues");
			if (!response.ok) {
				throw new Error("Failed to load queues data");
			}

			return (await response.json()) as QueueDTO[];
		},
	});

	const summonerSpellsQuery = useQuery({
		queryKey: ["summonerSpells"],
		queryFn: async () => {
			const response = await fetch("http://localhost:8000/summoner-spells");
			if (!response.ok) {
				throw new Error("Failed to load summoner spells data");
			}

			return (await response.json()) as SummonerSpellDTO[];
		},
	});

	if (
		!championMatchesQuery.data ||
		!itemQuery.data ||
		!queuesQuery.data ||
		!summonerSpellsQuery.data
	) {
		return <Loader color={"teal"} />;
	}

	return championMatchesQuery.data.map((match) => (
		<MatchBannerSummary
			key={match.info.gameId}
			match={match}
			queues={queuesQuery.data}
			summonerSpells={summonerSpellsQuery.data}
			items={itemQuery.data}
		/>
	));
}
