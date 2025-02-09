import { Alert, Flex, Loader } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { ChampionAbilitiesTabs } from "../../components/Champion/ChampionAbilities/ChampionAbilitiesTabs.tsx";
import { ChampionHeader } from "../../components/Champion/ChampionHeader.tsx";
import { ChampionSkins } from "../../components/Champion/ChampionSkins/ChampionSkins.tsx";
import { MatchBannerSummaryLoader } from "../../components/Match/MatchBannerSummaryLoader.tsx";
import { useChampion } from "../../hooks/api/useChampion.ts";

export const Route = createFileRoute("/champions/$championAlias")({
	component: ChampionPage,
});

export function ChampionPage() {
	const { championAlias } = Route.useParams();

	const query = useChampion(championAlias);

	if (query.status === "pending") {
		return <Loader color={"teal"} />;
	}

	if (query.status === "error") {
		return (
			<Alert title={"No champions found"} variant={"light"}>
				The Champion with Name: {championAlias} does not exist.
			</Alert>
		);
	}

	return (
		<>
			<Flex direction={"column"} gap={"md"}>
				<ChampionHeader champion={query.data} />
				<ChampionAbilitiesTabs champion={query.data} />
				<ChampionSkins champion={query.data} />

				<MatchBannerSummaryLoader championId={query.data.id} />
			</Flex>
		</>
	);
}
