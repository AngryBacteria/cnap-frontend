import { Alert, Loader, TextInput, Title } from "@mantine/core";
import { useMemo, useState } from "react";
import { ChampionReducedCard } from "../../components/ChampionReducedCard/ChampionReducedCard.tsx";
import type { ChampionReduced } from "../../model/GameDataReduced.ts";
import styles from "./ChampionsPage.module.css";
import { useQuery } from "@tanstack/react-query";

export function ChampionsPage() {
	const [nameSearch, setNameSearch] = useState<string>("");

	const query = useQuery({
		queryKey: ["champions"],
		queryFn: async () => {
			const response = await fetch(
				"http://localhost:8000/static/champions/reduced",
			);
			if (!response.ok) {
				throw new Error("Failed to load champion data");
			}

			const data = (await response.json()) as ChampionReduced[];
			if (data && data.length > 0) {
				return data;
			}
		},
	});

	/**
	 * Filter the champions based on the name search
	 */
	const filteredChampions = useMemo(
		() => {
			if (!query.data) {
				return [];
			}

			return query.data
				.filter((champion) => {
					// Check if name or title matches
					if (champion.id === -1) {
						return false;
					}
					return (
						champion.name.toLowerCase().includes(nameSearch.toLowerCase()) ||
						champion.title.toLowerCase().includes(nameSearch.toLowerCase())
					);
				})
				.sort((a, b) => a.name.localeCompare(b.name));
		},
		[query.data, nameSearch]
	);

	if (query.status === 'pending') {
		return <Loader color={"teal"} />;
	}

		if (query.status === 'error') {
		return (
			<Alert title={"No champions found"} variant={"light"}>
				Right now no champions are available. Try again later.
			</Alert>
		);
	}

	return (
		<>
			<section>
				<Title order={1} pb={"sm"}>
					League of legends Champions
				</Title>
				<section className={styles.filters}>
					<TextInput
						placeholder="Champion Name"
						onChange={(event) => setNameSearch(event.currentTarget.value)}
					/>
				</section>

				<section className={styles.champions}>
					{filteredChampions.map((champion) => {
						return (
							<ChampionReducedCard champion={champion} key={champion.id} />
						);
					})}
				</section>
			</section>
		</>
	);
}
