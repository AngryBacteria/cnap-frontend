import { Flex, Text } from "@mantine/core";
import { useMemo } from "react";
import type { E } from "../../../model/GameData.ts";

interface Props {
	championAbility: E;
}
// TODO damage number per effect (quite complex)
// TODO: skins
// TODO: basic champion stats (health, mana, and so on)
export function ChampionAbilityStats({ championAbility }: Props) {
	const abilityCooldowns = useMemo(() => {
		if (!championAbility.cooldown) {
			return [];
		}
		if (championAbility.cooldown.modifiers.length === 0) {
			return [];
		}

		// Round, deduplicate and return the cooldown values
		const rounded = championAbility.cooldown.modifiers[0].values.map(
			(value) => {
				return Math.round(value);
			},
		);
		return Array.from(new Set(rounded));
	}, [championAbility]);

	const abilityCosts = useMemo(() => {
		if (!championAbility.cost) {
			return [];
		}
		if (championAbility.cost.modifiers.length === 0) {
			return [];
		}
		// Round, deduplicate and return the cooldown values
		const rounded = championAbility.cost.modifiers[0].values.map((value) => {
			return Math.round(value);
		});
		return Array.from(new Set(rounded));
	}, [championAbility]);

	if (!championAbility.cooldown && !championAbility.cost) {
		return null;
	}
	return (
		<Flex gap={"md"} wrap={"wrap"} rowGap={"xs"} justify={"center"}>
			{abilityCooldowns.length > 0 ? (
				<Text fw={700} c={"dimmed"}>
					Cooldown: {abilityCooldowns.join(" / ")}
				</Text>
			) : (
				<Text fw={700} c={"dimmed"}>
					Cooldown: None
				</Text>
			)}

			{abilityCosts.length > 0 ? (
				<Text fw={700} c={"dimmed"}>
					Cost: {abilityCosts.join(" / ")}
				</Text>
			) : (
				<Text fw={700} c={"dimmed"}>
					Cost: None
				</Text>
			)}

			{championAbility.castTime &&
				championAbility.castTime.toLowerCase() !== "none" && (
					<Text fw={700} c={"dimmed"}>
						Cast Time: {championAbility.castTime}
					</Text>
				)}

			{championAbility.effectRadius && (
				<Text fw={700} c={"dimmed"}>
					Radius: {championAbility.effectRadius}
				</Text>
			)}

			{championAbility.targetRange && (
				<Text fw={700} c={"dimmed"}>
					TargetRange: {championAbility.targetRange}
				</Text>
			)}
		</Flex>
	);
}
