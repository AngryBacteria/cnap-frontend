import { memo, useEffect, useMemo, useState } from 'react';
import { Loader, Select, TextInput } from '@mantine/core';
import ChampionCard from '../../components/ChampionCard/ChampionCard.tsx';
import styles from './ChampionsPage.module.css';
import { ChampionReduced } from '../../model/GameDataReduced.ts';
import { getChampionDataReduced } from '../../utils/RiotUtil.ts';
import { capitalizeFirstLetter } from '../../utils/GeneralUtil.ts';

const ChampionsPage = memo(function ChampionsPage() {
  const [championData, setChampionData] = useState<ChampionReduced[]>([]);
  const [loadingState, setLoadingState] = useState<
    'error' | 'loading' | 'available'
  >('error');

  const [nameSearch, setNameSearch] = useState<string>('');
  const [factionSearch, setFactionSearch] = useState<string | null>('');

  /**
   * Fetch champion data from our api on component mount
   */
  useEffect(() => {
    const fetchData = async () => {
      setChampionData(await getChampionDataReduced());
      setLoadingState('available');
    };
    setLoadingState('loading');
    fetchData()
      .then(() => setLoadingState('available'))
      .catch((error) => {
        setLoadingState('error');
        console.error('Error:', error);
      });
  }, []);

  /**
   * Filter the champions based on the name search
   */
  const filteredChampions = useMemo(
    () =>
      championData.filter((champion) => {
        // Check if faction matches
        let factionMatch: boolean;
        if (!factionSearch) {
          factionMatch = true;
        } else {
          factionMatch = champion.faction
            .toLowerCase()
            .includes(factionSearch.toLowerCase());
        }

        // Check if name or title matches
        const championMatch =
          champion.name.toLowerCase().includes(nameSearch.toLowerCase()) ||
          champion.title.toLowerCase().includes(nameSearch.toLowerCase());

        return factionMatch && championMatch;
      })
        .sort((a, b) => a.name.localeCompare(b.name)),
    [championData, nameSearch, factionSearch],
  );

  const uniqueFactions = useMemo(() => {
    return Array.from(
      new Set(
        championData.map((champion) => capitalizeFirstLetter(champion.faction)),
      ),
    );
  }, [championData]);

  return (
    <>
      {loadingState === 'error' && <h1>Failed to load data</h1>}
      {loadingState === 'loading' && <Loader color="teal" />}
      {loadingState === 'available' && (
        <section>
          <h1>League of legends Champions</h1>
          <section className={styles.filters}>
            <TextInput
              placeholder="Champion Name"
              onChange={(event) => setNameSearch(event.currentTarget.value)}
            />
            <Select
              onChange={setFactionSearch}
              placeholder="Faction"
              data={uniqueFactions}
            />
          </section>

          <section className={styles.champions}>
            {filteredChampions.map((champion) => {
              return <ChampionCard champion={champion} key={champion.key} />;
            })}
          </section>
        </section>
      )}
    </>
  );
});

export default ChampionsPage;
