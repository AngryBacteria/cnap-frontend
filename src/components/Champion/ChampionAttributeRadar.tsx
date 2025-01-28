import { RadarChart } from "@mantine/charts";
import { useMemo } from "react";
import type { Champion } from "../../model/GameData.ts";

interface Props {
	champion: Champion;
}

export function ChampionAttributeRadar({ champion }: Props) {
	const chartData = useMemo(() => {
		return Object.entries(champion.attributeRatings)
			.map(([key, value]) => {
				return {
					attribute: key,
					value: value as number,
				};
			})
			.filter((data) => data.attribute !== "abilityReliance");
	}, [champion]);

	return (
		<RadarChart
			h={300}
			dataKey="attribute"
			withPolarRadiusAxis={false}
			data={chartData}
			series={[{ name: "value", color: "teal", opacity: 0.5 }]}
		/>
	);
}
