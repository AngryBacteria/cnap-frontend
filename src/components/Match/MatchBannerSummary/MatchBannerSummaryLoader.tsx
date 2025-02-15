import { Alert, Loader, Pagination, Title } from "@mantine/core";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useChampionMatches } from "../../../hooks/api/useChampionMatches";
import { useItems } from "../../../hooks/api/useItems";
import { useQueues } from "../../../hooks/api/useQueues";
import { useSummonerSpells } from "../../../hooks/api/useSummonerSpells";
import { MatchBannerSummary } from "./MatchBannerSummary";

export interface Props {
	championId: number;
}

export function MatchBannerSummaryLoader({ championId }: Props) {
	const { page } = useSearch({ from: "/champions/$championAlias" });
	const navigate = useNavigate({ from: "/champions/$championAlias" });
	const handlePageChange = (newPage: number) => {
		navigate({
			search: { page: newPage },
		});
	};

	const championMatchesQuery = useChampionMatches(championId, page);
	const itemQuery = useItems();
	const queuesQuery = useQueues();
	const summonerSpellsQuery = useSummonerSpells();

	if (
		championMatchesQuery.status === "pending" ||
		itemQuery.status === "pending" ||
		queuesQuery.status === "pending" ||
		summonerSpellsQuery.status === "pending"
	) {
		return <Loader color={"teal"} />;
	}

	if (
		championMatchesQuery.status === "error" ||
		itemQuery.status === "error" ||
		queuesQuery.status === "error" ||
		summonerSpellsQuery.status === "error"
	) {
		return <Alert title={"Error loading champion matches"} variant={"light"} />;
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
				value={page}
				onChange={handlePageChange}
			/>
		</>
	);
}
