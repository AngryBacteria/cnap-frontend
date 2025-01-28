import { Badge, Flex } from "@mantine/core";
import { useMemo } from "react";
import type { E } from "../../../model/GameData.ts";
import { capitalizeFirstLetter } from "../../../utils/GeneralUtil.ts";

interface Props {
	championAbility: E;
}
export function ChampionAbilityTags({ championAbility }: Props) {
	const abilityTags = useMemo(() => {
		const tags = [];
		if (championAbility.damageType) {
			const damageType = championAbility.damageType.split("_").join(" ");
			tags.push(capitalizeFirstLetter(damageType, true));
		}
		if (championAbility.resource) {
			tags.push(capitalizeFirstLetter(championAbility.resource, true));
		}
		return tags;
	}, [championAbility]);

	return (
		<Flex gap={"md"} wrap={"wrap"}>
			{abilityTags.map((tag) => {
				return (
					<Badge key={tag} color={"teal"}>
						{tag}
					</Badge>
				);
			})}
		</Flex>
	);
}
