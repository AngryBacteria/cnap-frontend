import { MantineProvider, createTheme } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/notifications/styles.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./MainLayout.tsx";
import { ChampionPage } from "./pages/ChampionPage/ChampionPage.tsx";
import { ChampionsPage } from "./pages/ChampionsPage/ChampionsPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mantine theme
const theme = createTheme({
	primaryColor: "teal",
});

// Router config
const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <h2>Home</h2>,
			},
			{
				path: "/champions",
				element: <ChampionsPage />,
			},
			{
				path: "/champions/:championId",
				element: <ChampionPage />,
			},
		],
	},
]);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 60 * 1000, // 1 hour,
			retry: 2,
		},
	},
});

// React startup
const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Failed to find root element");
}
createRoot(rootElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme} defaultColorScheme="auto">
				<RouterProvider router={router} />
			</MantineProvider>
		</QueryClientProvider>
	</StrictMode>,
);
