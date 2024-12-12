import { memo } from 'react';
import { Card, Image } from '@mantine/core';
import styles from './ChampionCard.module.css';
import { ChampionReduced } from '../../model/GameDataReduced.ts';
import {
  capitalizeFirstLetter,
  truncateText,
} from '../../utils/GeneralUtil.ts';
import { useNavigate } from 'react-router-dom';

interface ChampionCardProps {
  champion: ChampionReduced;
}

const ChampionCard = memo(function ChampionCard({
  champion,
}: ChampionCardProps) {
  const navigate = useNavigate();
  const goToChampionDetail = () => {
    navigate(`/champions/${champion.key}`);
  };

  return (
    <Card
      withBorder
      className={styles.championCard}
      shadow="sm"
      onClick={goToChampionDetail}
    >
      <Card.Section>
        <Image src={champion.skins[0]?.splashPath} />
      </Card.Section>

      <section className={styles.championName}>
        <h2>{champion.name}</h2>
        <h5>{capitalizeFirstLetter(champion.title)}</h5>
        <p>{truncateText(champion.lore, 100)}</p>
      </section>
    </Card>
  );
});

export default ChampionCard;
