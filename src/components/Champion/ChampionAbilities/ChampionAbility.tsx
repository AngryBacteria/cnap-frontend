import { E } from '../../../model/GameData.ts';
import { memo } from 'react';
import { Divider, Flex, Image, Text, Title } from '@mantine/core';
import ChampionAbilityStats from './ChampionAbilityStats.tsx';
import ChampionAbilityTags from './ChampionAbilityTags.tsx';

interface Props {
  championAbility: E[];
}

const ChampionAbility = memo(function ChampionHeader({
  championAbility,
}: Props) {
  return (
    <section>
      {championAbility.map((ability, index) => {
        return (
          <section
            key={ability.name}
            style={{ marginTop: index === 0 ? '1rem' : 0 }}
          >
            <Flex direction={'column'} align={'start'} gap={'xs'}>
              <Flex direction={'row'} gap={'md'} align={'center'}>
                <Image src={ability.icon} h={75} w={75} />
                <Flex direction={'column'} gap={'sm'}>
                  <Title order={2}>{ability.name}</Title>
                  <ChampionAbilityTags championAbility={ability} />
                </Flex>
              </Flex>

              {ability.effects.map((effect, index) => {
                return <Text key={index}>{effect.description}</Text>;
              })}

              <ChampionAbilityStats championAbility={ability} />
            </Flex>

            {index !== championAbility.length - 1 && <Divider my={'md'} />}
          </section>
        );
      })}
    </section>
  );
});

export default ChampionAbility;
