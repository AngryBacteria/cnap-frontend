import { Alert, Flex, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChampionAbilitiesTabs } from "../../components/Champion/ChampionAbilities/ChampionAbilitiesTabs.tsx";
import { ChampionHeader } from "../../components/Champion/ChampionHeader.tsx";
import type { Champion } from "../../model/GameData.ts";
import { getChampionData } from "../../utils/RiotUtil.ts";

export function ChampionPage() {
	const { championKey } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [championData, setChampionData] = useState<Champion | null>(null);

	/**
	 * Fetch champion data from API
	 */
	useEffect(() => {
		setIsLoading(true);
		getChampionData(championKey ?? "")
			.then((data) => {
				setChampionData(data);
			})
			.catch((error) => console.error("Error:", error))
			.finally(() => setIsLoading(false));
	}, [championKey]);

	if (isLoading) {
		return <Loader color={"teal"} />;
	}

	if (!championData) {
		return (
			<Alert title={"No champions found"} variant={"light"}>
				The Champion with key {championKey} does not exist.
			</Alert>
		);
	}

	return (
		<>
			<Flex direction={"column"} gap={"md"}>
				<ChampionHeader champion={championData} />
				<ChampionAbilitiesTabs champion={championData} />
			</Flex>
		</>
	);
}
