import { Card, Image, Text, Title } from "@mantine/core";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { ChampionReduced } from "../../model/GameDataReduced.ts";
import {
	capitalizeFirstLetter,
	truncateText,
} from "../../utils/GeneralUtil.ts";
import styles from "./ChampionReducedCard.module.css";

interface ChampionCardProps {
	champion: ChampionReduced;
}

const ChampionReducedCard = memo(function ChampionCard({
	champion,
}: ChampionCardProps) {
	const navigate = useNavigate();
	const goToChampionDetail = () => {
		navigate(`/champions/${champion.key}`);
	};

	return (
		<Card
			withBorder
			className={styles.championCard}
			shadow="sm"
			onClick={goToChampionDetail}
		>
			<Card.Section>
				<Image src={champion.skins[0]?.splashPath} />
			</Card.Section>

			<section className={styles.championName}>
				<Title order={2} pt={"xs"} ta={"center"}>
					{champion.name}
				</Title>
				<Title order={5} c={"dimmed"} pb={"sm"} ta={"center"}>
					{capitalizeFirstLetter(champion.title)}
				</Title>
				<Text ta={"center"}>{truncateText(champion.lore, 100)}</Text>
			</section>
		</Card>
	);
});

export default ChampionReducedCard;
