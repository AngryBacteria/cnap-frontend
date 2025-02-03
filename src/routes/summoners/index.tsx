import { Alert, Flex, Loader, TextInput, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SummonerCard } from "../../components/Summoner/SummonerCard.tsx";
import type { SummonerDTO } from "../../model/SummonerDTO.ts";
import styles from "./index.module.css";

export const Route = createFileRoute("/summoners/")({
	component: SummonersPage,
});

function SummonersPage() {
	const [nameSearch, setNameSearch] = useState("");

	const query = useQuery({
		queryKey: ["summoners"],
		queryFn: async () => {
			const response = await fetch("http://localhost:8000/summoners");
			if (!response.ok) {
				throw new Error("Failed to load summoners data");
			}

			return (await response.json()) as SummonerDTO[];
		},
	});

	if (query.status === "pending") {
		return <Loader color={"teal"} />;
	}

	if (query.status === "error") {
		return (
			<Alert title={"No summoners found"} variant={"light"}>
				Right now no summoners are available. Try again later.
			</Alert>
		);
	}

	const filteredSummoners = query.data.filter((summoner) => {
		return (
			summoner.gameName.toLowerCase().includes(nameSearch.toLowerCase()) ||
			summoner.tagLine.toLowerCase().includes(nameSearch.toLowerCase())
		);
	});

	return (
		<>
			<Flex direction={"column"} pb={"xs"}>
				<Title order={1} pb={"sm"}>
					The Summoners of CnAP
				</Title>
				<Flex>
					<TextInput
						placeholder="Summoner Name / Tag"
						onChange={(event) => setNameSearch(event.currentTarget.value)}
					/>
				</Flex>
			</Flex>

			<section className={styles.summoners}>
				{filteredSummoners.map((summoner) => {
					return <SummonerCard summoner={summoner} key={summoner.puuid} />;
				})}
			</section>
		</>
	);
}
