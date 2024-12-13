import { Champion } from '../../../model/GameData.ts';
import { memo } from 'react';
import { Badge, Card, Flex, Grid, Image, Text, Title } from '@mantine/core';
import ChampionAttributeRadar from '../ChampionAttributeRadar/ChampionAttributeRadar.tsx';

interface Props {
  champion: Champion;
}

const ChampionHeader = memo(
  function ChampionHeader({ champion }: Props) {

    return <Card shadow={'md'} withBorder>
        <Grid justify="space-between">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Flex gap={'md'}>
              <Image
                visibleFrom={'md'}
                h={300}
                w={'auto'}
                src={champion.skins[0].loadScreenPath}
              />
              <Flex direction={'column'}>
                <Flex align={'center'} columnGap={'md'} wrap={'wrap'}>
                  <Title order={1}>{champion.key}</Title>
                  {champion.roles.map(role => {
                    return <Badge color="teal" key={role}>{role}</Badge>
                  })}
                </Flex>
                <Text tt={'capitalize'} c={'dimmed'}>
                  {champion.title}
                </Text>
                <Text>{champion.lore}</Text>
              </Flex>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <ChampionAttributeRadar champion={champion} />
          </Grid.Col>
        </Grid>
      </Card>
  }
)

export default ChampionHeader;