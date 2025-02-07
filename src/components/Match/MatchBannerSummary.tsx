import { Card, Flex, HoverCard, Image, Text, Tooltip } from "@mantine/core";
import { useMemo } from "react";
import type { MatchDTO } from "../../model/MatchDTO";
import styles from "./MatchBannerSummary.module.css";

interface Props {
	match: MatchDTO;
}

// TODO: Lane info
// TODO: Queue info
// TODO: Summoner spells
// TODO: Item build
// TODO API request
// TODO check cs if correct

export function MatchBannerSummary({ match }: Props) {
	const participant = match.info.participants[0];

	const championImage = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${participant.championId}.png`;

	const formattedDate = new Intl.DateTimeFormat("en-US").format(
		new Date(Number.parseInt(match.info.gameCreation.$numberLong)),
	);

	const formattedTimeAgo = useMemo(() => {
		const rtf = new Intl.RelativeTimeFormat("en", {
			numeric: "auto",
			style: "long",
		});

		const diffTime = Math.abs(
			Number.parseInt(match.info.gameCreation.$numberLong) -
				new Date().getTime(),
		);
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		return rtf.format(-diffDays, "days");
	}, [match.info.gameCreation.$numberLong]);

	const formattedGameDuration = `${Math.round(match.info.gameDuration / 60)} minutes`;

	const kda = (participant.kills + participant.assists) / participant.deaths;

	const csPerMinute = Math.round(
		participant.totalMinionsKilled / Math.round(match.info.gameDuration / 60),
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
						<Text>NORMAL DRAFT</Text>

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
						<Tooltip
							label={participant.championName}
							color="teal"
							position="bottom"
							transitionProps={{ transition: "fade-up", duration: 300 }}
						>
							<Image src={championImage} h={50} w={50} />
						</Tooltip>

						<Flex direction={"column"} justify={"center"} align={"center"}>
							<Text>{participant.summonerName}</Text>
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

						<Flex direction={"row"} wrap={"wrap"} gap={"xs"}>
							<Image
								src={"https://cdn.bynogame.com/asd/1689428653606.webp"}
								h={25}
								w={25}
							/>
							<Image
								src={"https://cdn.bynogame.com/asd/1689428653606.webp"}
								h={25}
								w={25}
							/>
							<Image
								src={"https://cdn.bynogame.com/asd/1689428653606.webp"}
								h={25}
								w={25}
							/>
							<Image
								src={"https://cdn.bynogame.com/asd/1689428653606.webp"}
								h={25}
								w={25}
							/>
							<Image
								src={"https://cdn.bynogame.com/asd/1689428653606.webp"}
								h={25}
								w={25}
							/>
							<Image
								src={"https://cdn.bynogame.com/asd/1689428653606.webp"}
								h={25}
								w={25}
							/>
						</Flex>
					</Flex>
				</Card.Section>
			</Card>
		</>
	);
}
