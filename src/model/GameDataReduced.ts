export interface ChampionReduced {
	id: number;
	key: string;
	name: string;
	title: string;
	lore: string;
	skins: Skin[];
	faction: string;
}

export interface Skin {
	name: string;
	lore: null | string;
	splashPath: string;
}
