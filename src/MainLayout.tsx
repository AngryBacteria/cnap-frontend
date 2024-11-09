import { useDisclosure } from '@mantine/hooks';
import {
  AppShell,
  Burger,
  Button,
  Group,
  useMantineColorScheme,
} from '@mantine/core';
import { ChampionsPage } from './pages/ChampionsPage/ChampionsPage.tsx';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function MainLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: { base: 150, sm: 200, md: 300 },
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Button size={'xs'}>
            {colorScheme == 'dark' ? (
              <IconMoon size={20} onClick={() => setColorScheme('light')} />
            ) : (
              <IconSun size={20} onClick={() => setColorScheme('dark')} />
            )}
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main>
        <ChampionsPage />
      </AppShell.Main>
    </AppShell>
  );
}
