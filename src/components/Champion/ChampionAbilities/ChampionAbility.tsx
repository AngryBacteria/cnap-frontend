import { Divider, Flex, Image, Text, Title } from "@mantine/core";
import type { E } from "../../../model/GameData.ts";
import { ChampionAbilityNoteModal } from "./ChampionAbilityNoteModal.tsx";
import { ChampionAbilityStats } from "./ChampionAbilityStats.tsx";
import { ChampionAbilityTags } from "./ChampionAbilityTags.tsx";

interface Props {
	championAbility: E[];
}

export function ChampionAbility({ championAbility }: Props) {
	return (
		<section>
			{championAbility.map((ability, index) => {
				return (
					<section
						key={ability.name}
						style={{ marginTop: index === 0 ? "1rem" : 0 }}
					>
						<Flex direction={"column"} align={"start"} gap={"xs"}>
							<Flex direction={"row"} align={"center"} gap={"md"}>
								<Image src={ability.icon} h={75} w={75} />
								<Flex direction={"column"} gap={"sm"}>
									<Title order={2}>{ability.name}</Title>
									<ChampionAbilityTags championAbility={ability} />
								</Flex>
							</Flex>

							{ability.effects.map((effect) => {
								return (
									<Text key={effect.description}>{effect.description}</Text>
								);
							})}

							<Flex
								direction={"row"}
								justify={"space-between"}
								w={"100%"}
								wrap={"wrap"}
								rowGap={"md"}
								gap={"md"}
							>
								<ChampionAbilityStats championAbility={ability} />
								<ChampionAbilityNoteModal ability={ability} />
							</Flex>
						</Flex>

						{index !== championAbility.length - 1 && <Divider my={"md"} />}
					</section>
				);
			})}
		</section>
	);
}
