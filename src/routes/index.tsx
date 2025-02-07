import { Text } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { MatchBannerSummary } from "../components/Match/MatchBannerSummary";

export const Route = createFileRoute("/")({
	component: Index,
});

import match from "../assets/match.json";
import type { MatchDTO } from "../model/MatchDTO";

const typedMatch = match as unknown as MatchDTO;

function Index() {
	return (
		<div className="p-2">
			<Text>Welcome Home!</Text>
			<MatchBannerSummary match={typedMatch} />
		</div>
	);
}
