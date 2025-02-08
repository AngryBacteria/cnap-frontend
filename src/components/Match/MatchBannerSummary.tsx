import { Card, Flex, Image, Text, Tooltip } from "@mantine/core";
import { useMemo } from "react";
import type { ItemDTO } from "../../model/ItemDTO";
import type { MatchDTOSingle } from "../../model/MatchDTO";
import type { QueueDTO } from "../../model/QueueDTO";
import type { SummonerSpellDTO } from "../../model/SummonerSpellDTO";
import styles from "./MatchBannerSummary.module.css";

interface Props {
	match: MatchDTOSingle;
	queues: QueueDTO[];
	summonerSpells: SummonerSpellDTO[];
	items: ItemDTO[];
}

// TODO check cs if correct

export function MatchBannerSummary({
	match,
	queues,
	summonerSpells,
	items,
}: Props) {
	const participant = match.info.participants;

	const championImage = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${participant.championId}.png`;

	const formattedDate = new Intl.DateTimeFormat("en-US").format(
		new Date(match.info.gameCreation),
	);

	const formattedTimeAgo = useMemo(() => {
		const rtf = new Intl.RelativeTimeFormat("en", {
			numeric: "auto",
			style: "long",
		});

		const diffTime = Math.abs(match.info.gameCreation - new Date().getTime());
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		return rtf.format(-diffDays, "days");
	}, [match.info.gameCreation]);

	const formattedGameDuration = `${Math.round(match.info.gameDuration / 60)} minutes`;

	const kda = Math.round(
		(participant.kills + participant.assists) / participant.deaths,
	);

	const csPerMinute = Math.round(
		participant.totalMinionsKilled / Math.round(match.info.gameDuration / 60),
	);

	const queue = queues.find((q) => q.queueId === match.info.queueId);

	function getItems() {
		return [
			participant.item0,
			participant.item1,
			participant.item2,
			participant.item3,
			participant.item4,
			participant.item5,
		]
			.map((itemId) => items.find((item) => item.id === itemId))
			.filter((item) => item !== undefined);
	}

	const summonerSpell1 = summonerSpells.find(
		(s) => s.id === participant.summoner1Id,
	);
	const summonerSpell2 = summonerSpells.find(
		(s) => s.id === participant.summoner2Id,
	);

	return (
		<>
			<Card
				shadow={"md"}
				withBorder
				padding={"xs"}
				className={participant.win ? styles.wonCard : styles.lostCard}
			>
				<Card.Section withBorder inheritPadding py="4px">
					<Flex direction={"row"} gap={"md"}>
						<Text>
							{queue?.description.replace("games", "").trim() ||
								"Unknown Queue"}
						</Text>

						<Tooltip
							label={formattedDate}
							color="teal"
							transitionProps={{ transition: "fade-down", duration: 300 }}
						>
							<Text c="dimmed">{formattedTimeAgo}</Text>
						</Tooltip>

						<Text c="dimmed">{formattedGameDuration}</Text>
					</Flex>
				</Card.Section>

				<Card.Section withBorder inheritPadding py="4px">
					<Flex
						direction={"row"}
						columnGap={"xl"}
						rowGap={"xs"}
						align={"center"}
						wrap={"wrap"}
					>
						<Flex direction={"row"} justify={"center"} align={"center"}>
							<Tooltip
								label={participant.championName}
								color="teal"
								position="bottom"
								transitionProps={{ transition: "fade-up", duration: 300 }}
							>
								<Image src={championImage} h={50} w={50} />
							</Tooltip>

							<Flex direction={"column"}>
								<Image src={summonerSpell1?.iconPath} h={25} w={25} />
								<Image src={summonerSpell2?.iconPath} h={25} w={25} />
							</Flex>
						</Flex>

						<Flex direction={"column"} justify={"center"} align={"center"}>
							<Text>{participant.riotIdGameName}</Text>
							<Text c="dimmed">#{participant.riotIdTagline}</Text>
						</Flex>

						<Flex direction={"column"} justify={"center"} align={"center"}>
							<Text>
								{participant.kills}/{participant.deaths}/{participant.assists}
							</Text>
							<Tooltip
								label="A KDA of above 2 is considered good"
								color="teal"
								position="bottom"
								transitionProps={{ transition: "fade-up", duration: 300 }}
							>
								<Text c={kda > 2 ? "green.7" : "red.7"}>KDA {kda}</Text>
							</Tooltip>
						</Flex>

						<Flex direction={"column"} justify={"center"} align={"center"}>
							<Text>{participant.totalMinionsKilled} CS</Text>
							<Tooltip
								label="A CS per minute of 5 or above is considered good"
								color="teal"
								position="bottom"
								transitionProps={{ transition: "fade-up", duration: 300 }}
							>
								<Text c={csPerMinute > 5 ? "green.7" : "red.7"}>
									CS / Min {csPerMinute}
								</Text>
							</Tooltip>
						</Flex>

						<Flex direction={"row"} wrap={"wrap"} gap={"5px"}>
							{getItems().map((item) => (
								<Image src={item?.iconPath} h={25} w={25} key={item?.id} />
							))}
						</Flex>
					</Flex>
				</Card.Section>
			</Card>
		</>
	);
}
