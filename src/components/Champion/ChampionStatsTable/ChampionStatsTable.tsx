import { memo } from "react";
import type { ItemStat } from "../../../model/GameData.ts";

interface Props {
	championStats: Record<string, ItemStat>;
}
const ChampionStatsTable = memo(function ChampionStatsTable({
	championStats,
}: Props) {
	//TODO
	console.log(championStats);

	return <></>;
});

export default ChampionStatsTable;
