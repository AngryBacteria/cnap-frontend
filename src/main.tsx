import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChampionsPage from './pages/ChampionsPage/ChampionsPage.tsx';
import MainLayout from './MainLayout.tsx';

const theme = createTheme({
  primaryColor: 'teal',
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <h2>Home</h2>,
      },
      {
        path: '/champions',
        element: <ChampionsPage />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
