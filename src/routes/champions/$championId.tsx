import { Alert, Flex, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ChampionAbilitiesTabs } from "../../components/Champion/ChampionAbilities/ChampionAbilitiesTabs.tsx";
import { ChampionHeader } from "../../components/Champion/ChampionHeader.tsx";
import type { Champion } from "../../model/GameData.ts";

export const Route = createFileRoute("/champions/$championId")({
	component: ChampionPage,
});

export function ChampionPage() {
	const { championId } = Route.useParams();

	const query = useQuery({
		queryKey: ["champion", championId],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:8000/static/champions/${championId}`,
			);
			if (!response.ok) {
				throw new Error("Failed to load champion data");
			}

			return (await response.json()) as Champion;
		},
	});

	if (query.status === "pending") {
		return <Loader color={"teal"} />;
	}

	if (query.status === "error") {
		return (
			<Alert title={"No champions found"} variant={"light"}>
				The Champion with ID {championId} does not exist.
			</Alert>
		);
	}

	return (
		<>
			<Flex direction={"column"} gap={"md"}>
				<ChampionHeader champion={query.data} />
				<ChampionAbilitiesTabs champion={query.data} />
			</Flex>
		</>
	);
}
