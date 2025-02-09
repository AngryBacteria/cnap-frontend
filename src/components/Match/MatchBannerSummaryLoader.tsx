import { Loader, Pagination, Title } from "@mantine/core";
import { useState } from "react";
import { useChampionMatches } from "../../hooks/api/useChampionMatches";
import { useItems } from "../../hooks/api/useItems";
import { useQueues } from "../../hooks/api/useQueues";
import { useSummonerSpells } from "../../hooks/api/useSummonerSpells";
import { MatchBannerSummary } from "./MatchBannerSummary";

export interface Props {
	championId: number;
}

export function MatchBannerSummaryLoader({ championId }: Props) {
	const [activePage, setActivePage] = useState(1);

	const championMatchesQuery = useChampionMatches(championId, activePage);
	const itemQuery = useItems();
	const queuesQuery = useQueues();
	const summonerSpellsQuery = useSummonerSpells();

	if (
		!championMatchesQuery.data ||
		!itemQuery.data ||
		!queuesQuery.data ||
		!summonerSpellsQuery.data
	) {
		return <Loader color={"teal"} />;
	}

	return (
		<>
			<Title order={2}>Matches from CnAP Players on this champion</Title>
			{championMatchesQuery.data.data.map((match) => (
				<MatchBannerSummary
					key={match.info.gameId}
					match={match}
					queues={queuesQuery.data}
					summonerSpells={summonerSpellsQuery.data}
					items={itemQuery.data}
				/>
			))}
			<Pagination
				total={championMatchesQuery.data.maxPage}
				value={activePage}
				onChange={setActivePage}
			/>
		</>
	);
}
