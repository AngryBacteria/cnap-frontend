export interface GameData {
	champions: Champion[];
	items: Item[];
	game_modes: GameMode[];
	game_types: GameType[];
	maps: Map[];
	queues: Queue[];
}

export interface Item {
	id: number;
	name: string;
	description: string;
	categories: string[];
	price: number;
	priceTotal: number;
	iconPath: string;
}

export interface Champion {
	id: number;
	name: string;
	alias: string;
	title: string;
	shortBio: string;
	tacticalInfo: TacticalInfo;
	playstyleInfo: PlaystyleInfo;
	squarePortraitPath: string;
	stingerSfxPath: string;
	chooseVoPath: string;
	banVoPath: string;
	roles: string[];
	skins: Skin[];
	passive: Passive;
	spells: Spell[];
	uncenteredSplashPath: string;
}

export interface Passive {
	name: string;
	abilityIconPath: string;
	abilityVideoPath: string;
	abilityVideoImagePath: string;
	description: string;
}

export interface PlaystyleInfo {
	damage: number;
	durability: number;
	crowdControl: number;
	mobility: number;
	utility: number;
}

export interface Skin {
	id: number;
	name: string;
	splashPath: string;
	uncenteredSplashPath: string;
	tilePath: string;
	loadScreenPath: string;
	rarity: string;
	isLegacy: boolean;
	description: string;
}

export interface Spell {
	spellKey: string;
	name: string;
	abilityIconPath: string;
	abilityVideoPath: string;
	abilityVideoImagePath: string;
	cost: string;
	cooldown: string;
	description: string;
	dynamicDescription: string;
	range: number[];
	costCoefficients: number[];
	cooldownCoefficients: number[];
}

export interface TacticalInfo {
	style: number;
	difficulty: number;
	damageType: string;
}

export interface GameMode {
	gameMode: string;
	description: string;
}

export interface GameType {
	gametype: string;
	description: string;
}

export interface Map {
	mapId: number;
	mapName: string;
	notes: string;
}

export interface Queue {
	queueId: number;
	description: null | string;
	map: string;
	notes: null | string;
}
