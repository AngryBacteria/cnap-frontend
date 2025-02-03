import { Alert, Flex, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ChampionAbilitiesTabs } from "../../components/Champion/ChampionAbilities/ChampionAbilitiesTabs.tsx";
import { ChampionHeader } from "../../components/Champion/ChampionHeader.tsx";
import { ChampionSkins } from "../../components/Champion/ChampionSkins/ChampionSkins.tsx";
import type { LolV1ChampionDTO } from "../../model/LolV1ChampionDTO.ts";

export const Route = createFileRoute("/champions/$championAlias")({
	component: ChampionPage,
});

export function ChampionPage() {
	const { championAlias } = Route.useParams();

	const query = useQuery({
		queryKey: ["champion", championAlias],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:8000/static/champions/${championAlias}`,
			);
			if (!response.ok) {
				throw new Error("Failed to load champion data");
			}

			return (await response.json()) as LolV1ChampionDTO;
		},
	});

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
			</Flex>
		</>
	);
}
