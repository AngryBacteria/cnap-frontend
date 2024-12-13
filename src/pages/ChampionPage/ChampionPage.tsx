import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Champion } from '../../model/GameData.ts';
import { getChampionData } from '../../utils/RiotUtil.ts';
import {
  Alert,
  Loader
} from '@mantine/core';
import styles from './ChampionPage.module.css';
import ChampionHeader from '../../components/Champion/ChampionHeader/ChampionHeader.tsx';

const ChampionPage = memo(function ChampionsPage() {
  const { championKey } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [championData, setChampionData] = useState<Champion | null>(null);

  /**
   * Fetch champion data from API
   */
  useEffect(() => {
    setIsLoading(true);
    getChampionData(championKey ?? '')
      .then((data) => {
        setChampionData(data);
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => setIsLoading(false));
  }, [championKey]);

  if (isLoading) {
    return <Loader color={'teal'} />;
  }

  if (!championData) {
    return (
      <Alert title={'No champions found'} variant={'light'}>
        The Champion with key {championKey} does not exist.
      </Alert>
    );
  }

  return (
    <>
      <ChampionHeader champion={championData} />
      <p className={styles.jsonWrapper}>
        {JSON.stringify(championData, null, 4)}
      </p>
    </>
  );
});

export default ChampionPage;
