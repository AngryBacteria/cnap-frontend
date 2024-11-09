import { memo } from 'react';
import { RiotAssetsUtil } from '../../utils/RiotAssetsUtil.ts';
import { ShortChampionData } from '../../model/ShortChampionData.ts';
import { Card, Image } from '@mantine/core';

interface ChampionCardProps {
  champion: ShortChampionData;
}

const ChampionCard = memo(function Greeting({ champion }: ChampionCardProps) {
  const util = RiotAssetsUtil.getInstance();

  return (
    <Card withBorder className={'champion-card'}>
      <Card.Section>
        <Image
          src={util.getChampionSplashArtCentered(Number.parseInt(champion.key))}
        />
      </Card.Section>

      <Card.Section className={'champion-name'}>
        <h2>{champion.name}</h2>
        <h5>{champion.title}</h5>
        <p>{champion.blurb}</p>
      </Card.Section>
    </Card>
  );
});

export default ChampionCard;
