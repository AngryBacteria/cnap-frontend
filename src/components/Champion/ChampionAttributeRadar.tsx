import { RadarChart } from "@mantine/charts";
import { useMemo } from "react";
import type { LolV1ChampionDTO } from "../../model/LolV1ChampionDTO.ts";

interface Props {
	champion: LolV1ChampionDTO;
}

export function ChampionAttributeRadar({ champion }: Props) {
	const chartData = useMemo(() => {
		const output = Object.entries(champion.playstyleInfo).map(
			([key, value]) => {
				return {
					attribute: key,
					value: value as number,
				};
			},
		);

		output.push({
			attribute: "difficulty",
			value: champion.tacticalInfo.difficulty,
		});

		return output;
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
