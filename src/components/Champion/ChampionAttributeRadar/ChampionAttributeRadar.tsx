import { memo, useMemo } from 'react';
import { Champion } from '../../../model/GameData.ts';
import { RadarChart } from '@mantine/charts';

interface Props {
  champion: Champion;
}

const ChampionAttributeRadar = memo(function ChampionCard({ champion }: Props) {
  const chartData = useMemo(() => {
    return Object.entries(champion.attributeRatings)
      .map(([key, value]) => {
        return {
          attribute: key,
          value: value as number,
        };
      })
      .filter((data) => data.attribute !== 'abilityReliance');
  }, [champion]);

  return (
    <RadarChart
      h={300}
      dataKey="attribute"
      withPolarRadiusAxis={false}
      data={chartData}
      series={[{ name: 'value', color: 'teal', opacity: 0.5 }]}
    />
  );
});

export default ChampionAttributeRadar;
