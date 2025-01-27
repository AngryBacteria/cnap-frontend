import { ItemStat } from '../../../model/GameData.ts';
import { memo } from 'react';

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
