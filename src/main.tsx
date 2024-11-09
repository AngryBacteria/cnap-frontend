import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/nprogress/styles.css';
import { MainLayout } from './MainLayout.tsx';

const theme = createTheme({
  primaryColor: 'teal',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider forceColorScheme={'dark'} theme={theme}>
      <MainLayout />
    </MantineProvider>
  </StrictMode>,
);
