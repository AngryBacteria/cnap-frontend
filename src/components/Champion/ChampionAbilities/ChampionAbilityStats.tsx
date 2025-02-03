import { Flex, Text } from "@mantine/core";
import type { Spell } from "../../../model/LolV1ChampionDTO.ts";

interface Props {
	championAbility: Spell;
}

export function ChampionAbilityStats({ championAbility }: Props) {
	const cooldownList = [...new Set(championAbility.cooldownCoefficients)];
	const costList = [...new Set(championAbility.costCoefficients)];

	return (
		<Flex gap={"md"} wrap={"wrap"} rowGap={"xs"} justify={"start"}>
			{cooldownList.length > 0 ? (
				<Text fw={700} c={"dimmed"}>
					Cooldown: {cooldownList.join(" / ")}
				</Text>
			) : (
				<Text fw={700} c={"dimmed"}>
					Cooldown: None
				</Text>
			)}

			{costList.length > 0 ? (
				<Text fw={700} c={"dimmed"}>
					Cost: {costList.join(" / ")}
				</Text>
			) : (
				<Text fw={700} c={"dimmed"}>
					Cost: None
				</Text>
			)}

			{championAbility.range[0] && (
				<Text fw={700} c={"dimmed"}>
					Range: {championAbility.range[0]}
				</Text>
			)}
		</Flex>
	);
}
