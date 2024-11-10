import React, { memo, useEffect, useMemo, useState } from 'react';
import { ShortChampionData, Tag } from '../../model/ShortChampionData.ts';
import { RiotAssetsUtil } from '../../utils/RiotAssetsUtil.ts';
import { MultiSelect, TextInput } from '@mantine/core';
import ChampionCard from '../../components/ChampionCard/ChampionCard.tsx';
import styles from './ChampionsPage.module.css';

const ChampionsPage = memo(function ChampionsPage() {
  const [championData, setChampionData] = useState<ShortChampionData[]>([]);
  const [nameSearch, setNameSearch] = useState<string>('');
  const [tags, setTags] = useState<Tag[]>([]);

  const util = RiotAssetsUtil.getInstance();

  useEffect(() => {
    const fetchData = async () => {
      const data = await util.getShortChampionsData();
      setChampionData(data);
    };
    fetchData().catch((error) => console.error('Error:', error));
  }, [util]);

  function updateNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNameSearch(event.target.value);
  }

  function updateTagChange(newTags: string[]) {
    setTags(newTags as Tag[]);
  }

  const uniqueTags = useMemo(() => {
    return [...new Set(championData.flatMap((champ) => champ.tags))];
  }, [championData]);

  const filteredChampions = useMemo(
    () =>
      championData.filter((champion) => {
        const nameMatch = champion.name
          .toLowerCase()
          .includes(nameSearch.toLowerCase());
        const tagMatch =
          tags.length === 0 || tags.some((tag) => champion.tags.includes(tag));
        return nameMatch && tagMatch;
      }),
    [championData, nameSearch, tags],
  );

  return (
    <>
      <h1>League of legends Champions</h1>
      <section className={styles.filters}>
        <TextInput placeholder="Champion Name" onChange={updateNameChange} />
        <MultiSelect
          placeholder="Class"
          data={uniqueTags}
          onChange={updateTagChange}
        />
      </section>

      <section className={styles.champions}>
        {filteredChampions.map((champion) => {
          return <ChampionCard champion={champion} key={champion.key} />;
        })}
      </section>
    </>
  );
});

export default ChampionsPage;
