import type { ItemStat } from "../../model/GameData.ts";

interface Props {
	championStats: Record<string, ItemStat>;
}
export function ChampionStatsTable({ championStats }: Props) {
	//TODO
	console.log(championStats);

	return <></>;
}
