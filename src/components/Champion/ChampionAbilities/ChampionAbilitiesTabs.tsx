import { Champion } from '../../../model/GameData.ts';
import { memo } from 'react';
import { Card, Tabs } from '@mantine/core';
import ChampionAbility from './ChampionAbility.tsx';

interface Props {
  champion: Champion;
}

const ChampionAbilitiesTabs = memo(function ChampionHeader({
  champion,
}: Props) {
  return (
    <>
      <Card shadow={'md'} withBorder>
        <Tabs defaultValue="Q">
          <Tabs.List>
            <Tabs.Tab value="P">P</Tabs.Tab>
            <Tabs.Tab value="Q">Q</Tabs.Tab>
            <Tabs.Tab value="W">W</Tabs.Tab>
            <Tabs.Tab value="E">E</Tabs.Tab>
            <Tabs.Tab value="R">R</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="P">
            <ChampionAbility championAbility={champion.abilities.P} />
          </Tabs.Panel>
          <Tabs.Panel value="Q">
            <ChampionAbility championAbility={champion.abilities.Q} />
          </Tabs.Panel>
          <Tabs.Panel value="W">
            <ChampionAbility championAbility={champion.abilities.W} />
          </Tabs.Panel>
          <Tabs.Panel value="E">
            <ChampionAbility championAbility={champion.abilities.E} />
          </Tabs.Panel>
          <Tabs.Panel value="R">
            <ChampionAbility championAbility={champion.abilities.R} />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </>
  );
});

export default ChampionAbilitiesTabs;
