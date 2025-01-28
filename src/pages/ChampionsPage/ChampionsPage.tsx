import { Alert, Loader, Select, TextInput, Title } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { ChampionReducedCard } from "../../components/ChampionReducedCard/ChampionReducedCard.tsx";
import type { ChampionReduced } from "../../model/GameDataReduced.ts";
import { capitalizeFirstLetter } from "../../utils/GeneralUtil.ts";
import { getChampionDataReduced } from "../../utils/RiotUtil.ts";
import styles from "./ChampionsPage.module.css";

export function ChampionsPage() {
	const [championData, setChampionData] = useState<ChampionReduced[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [nameSearch, setNameSearch] = useState<string>("");
	const [factionSearch, setFactionSearch] = useState<string | null>("");

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
					// Check if faction matches
					let factionMatch: boolean;
					if (!factionSearch) {
						factionMatch = true;
					} else {
						factionMatch = champion.faction
							.toLowerCase()
							.includes(factionSearch.toLowerCase());
					}

					// Check if name or title matches
					const championMatch =
						champion.name.toLowerCase().includes(nameSearch.toLowerCase()) ||
						champion.title.toLowerCase().includes(nameSearch.toLowerCase());

					return factionMatch && championMatch;
				})
				.sort((a, b) => a.name.localeCompare(b.name)),
		[championData, nameSearch, factionSearch],
	);

	const uniqueFactions = useMemo(() => {
		return Array.from(
			new Set(
				championData.map((champion) => capitalizeFirstLetter(champion.faction)),
			),
		);
	}, [championData]);

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
					<Select
						onChange={setFactionSearch}
						placeholder="Faction"
						data={uniqueFactions}
					/>
				</section>

				<section className={styles.champions}>
					{filteredChampions.map((champion) => {
						return (
							<ChampionReducedCard champion={champion} key={champion.key} />
						);
					})}
				</section>
			</section>
		</>
	);
}
