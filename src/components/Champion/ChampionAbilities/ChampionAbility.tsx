import { E } from '../../../model/GameData.ts';
import { memo } from 'react';
import { Divider, Flex, Image, Text, Title } from '@mantine/core';
import ChampionAbilityStats from './ChampionAbilityStats.tsx';
import ChampionAbilityTags from './ChampionAbilityTags.tsx';
import ChampionAbilityNoteModal from './ChampionAbilityNoteModal.tsx';

interface Props {
  championAbility: E[];
}

const ChampionAbility = memo(function ChampionAbility({
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
              <Flex direction={'row'} align={'center'} gap={'md'}>
                <Image src={ability.icon} h={75} w={75} />
                <Flex direction={'column'} gap={'sm'}>
                  <Title order={2}>{ability.name}</Title>
                  <ChampionAbilityTags championAbility={ability} />
                </Flex>
              </Flex>

              {ability.effects.map((effect, index) => {
                return <Text key={index}>{effect.description}</Text>;
              })}

              <Flex
                direction={'row'}
                justify={'space-between'}
                w={'100%'}
                wrap={'wrap'}
                rowGap={'md'}
                gap={'md'}
              >
                <ChampionAbilityStats championAbility={ability} />
                <ChampionAbilityNoteModal ability={ability} />
              </Flex>
            </Flex>

            {index !== championAbility.length - 1 && <Divider my={'md'} />}
          </section>
        );
      })}
    </section>
  );
});

export default ChampionAbility;
