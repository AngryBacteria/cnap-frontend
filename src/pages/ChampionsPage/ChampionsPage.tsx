import { Alert, Loader, TextInput, Title } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { ChampionReducedCard } from "../../components/ChampionReducedCard/ChampionReducedCard.tsx";
import type { ChampionReduced } from "../../model/GameDataReduced.ts";
import { getChampionDataReduced } from "../../utils/RiotUtil.ts";
import styles from "./ChampionsPage.module.css";

export function ChampionsPage() {
	const [championData, setChampionData] = useState<ChampionReduced[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [nameSearch, setNameSearch] = useState<string>("");

	/**
	 * Fetch champion data from our api on component mount
	 */
	useEffect(() => {
		const fetchData = async () => {
			setChampionData(await getChampionDataReduced());
		};
		setIsLoading(true);
		fetchData()
			.catch((error) => {
				setChampionData([]);
				console.error("Error:", error);
			})
			.finally(() => setIsLoading(false));
	}, []);

	/**
	 * Filter the champions based on the name search
	 */
	const filteredChampions = useMemo(
		() =>
			championData
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
				.sort((a, b) => a.name.localeCompare(b.name)),
		[championData, nameSearch],
	);

	if (championData.length === 0 && !isLoading) {
		return (
			<Alert title={"No champions found"} variant={"light"}>
				Right now no champions are available.
			</Alert>
		);
	}

	if (isLoading) {
		return <Loader color={"teal"} />;
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
