import { Carousel } from "@mantine/carousel";
import { Card, Image, Title } from "@mantine/core";

import type { Champion } from "../../../model/GameData.ts";

interface Props {
	champion: Champion;
}
//TODO fullscreen popup
export function ChampionSkins({ champion }: Props) {
	return (
		<>
			<Card shadow={"md"} withBorder>
				<Title order={2} mb="sm">
					Skins
				</Title>

				<Carousel
					style={{ flex: 1 }}
					slideSize={{ sm: "50%", lg: "33.333333%", xl: "25%" }}
					slideGap={{ base: 0, sm: "sm" }}
					align={"start"}
					loop
				>
					{champion.skins.map((skin) => {
						return (
							<Carousel.Slide key={skin.id}>
								<Image src={skin.splashPath} mah={"25vh"} fit={"contain"} />
							</Carousel.Slide>
						);
					})}
				</Carousel>
			</Card>
		</>
	);
}
