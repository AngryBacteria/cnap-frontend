import { MultiSelect, Select } from "@mantine/core";
import { useQueues } from "../../../hooks/api/useQueues";
import { useMemo } from "react";

export function QueueSelector() {
	const queuesQuery = useQueues();

	if (queuesQuery.status === "pending" || queuesQuery.status === "error") {
		return (
			<Select data={[]} label="Select a Queue (nothing means return all)" />
		);
	}

	const formattedQueues = useMemo(() => {
		const output = [];
		for (const queue of queuesQuery.data) {
			if (queue.queueId && queue.description) {
				output.push({
					value: `${queue.queueId}`,
					label: queue.description,
				});
			}
		}

		return output;
	}, [queuesQuery.data]);

	return (
		<MultiSelect
			maw={400}
			hidePickedOptions
			clearable
			searchable
			data={formattedQueues}
			placeholder="Select a Queue (nothing means return all queues)"
		/>
	);
}
