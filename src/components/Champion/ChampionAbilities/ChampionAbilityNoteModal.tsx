import { Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import type { E } from "../../../model/GameData.ts";

interface Props {
	ability: E;
}
export function ChampionAbilityNoteModal({ ability }: Props) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			{ability.notes && ability.notes !== "No additional details." && (
				<IconInfoCircle onClick={open} />
			)}
			<Modal
				opened={opened}
				withCloseButton
				onClose={close}
				centered
				size={"98%"}
				title={ability.name}
			>
				<Text>{ability.notes}</Text>
			</Modal>
		</>
	);
}
