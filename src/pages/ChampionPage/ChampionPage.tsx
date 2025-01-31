import { Alert, Flex, Loader } from "@mantine/core";
import { useParams } from "react-router-dom";
import { ChampionAbilitiesTabs } from "../../components/Champion/ChampionAbilities/ChampionAbilitiesTabs.tsx";
import { ChampionHeader } from "../../components/Champion/ChampionHeader.tsx";
import type { Champion } from "../../model/GameData.ts";
import { useQuery } from '@tanstack/react-query';

export function ChampionPage() {
	const { championId } = useParams();

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

	if (query.status === 'pending') {
		return <Loader color={"teal"} />;
	}

	if (query.status === 'error') {
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
