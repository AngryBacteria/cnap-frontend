export interface LolV1ChampionTacticalInfo {
	style: number;
	difficulty: number;
	damageType: string;
}

export interface LolV1ChampionPlaystyleInfo {
	damage: number;
	durability: number;
	crowdControl: number;
	mobility: number;
	utility: number;
}

export interface LolV1ChampionSkinLine {
	id: number;
}

export interface LolV1ChampionSkinChromaDescription {
	region: string;
	description: string;
}

export interface LolV1ChampionSkinChromaRarity {
	region: string;
	rarity: number;
}

export interface LolV1ChampionSkinChroma {
	id: number;
	name: string;
	chromaPath: string;
	colors: string[];
	descriptions: LolV1ChampionSkinChromaDescription[];
	rarities: LolV1ChampionSkinChromaRarity[];
}

export enum SkinRarity {
	kMythic = 0,
	kNoRarity = 1,
	kEpic = 2,
	kTranscendent = 3,
	kExalted = 4,
	kRare = 5,
	kUltimate = 6,
	kLegendary = 7,
}

export interface LolV1ChampionSkin {
	id: number;
	isBase: boolean;
	name: string;
	splashPath: string;
	uncenteredSplashPath: string;
	tilePath: string;
	loadScreenPath: string;
	loadScreenVintagePath?: string;
	skinType: string;
	rarity: SkinRarity;
	isLegacy: boolean;
	splashVideoPath: string | null;
	collectionSplashVideoPath: string | null;
	collectionCardHoverVideoPath: string | null;
	featuresText: string | null;
	chromaPath?: string;
	emblems: string | null;
	regionRarityId: number;
	rarityGemPath: string | null;
	skinLines?: LolV1ChampionSkinLine[];
	description?: string;
	chromas?: LolV1ChampionSkinChroma[];
}

export interface LolV1ChampionPassive {
	name: string;
	abilityIconPath: string;
	abilityVideoPath: string;
	abilityVideoImagePath: string;
	description: string;
}

export interface LolV1ChampionSpellCoefficients {
	coefficient1: number;
	coefficient2: number;
}

export interface LolV1ChampionSpellEffectAmounts {
	Effect1Amount: number[];
	Effect2Amount: number[];
	Effect3Amount: number[];
	Effect4Amount: number[];
	Effect5Amount: number[];
	Effect6Amount: number[];
	Effect7Amount: number[];
	Effect8Amount: number[];
	Effect9Amount: number[];
	Effect10Amount: number[];
}

export interface LolV1ChampionSpellAmmo {
	ammoRechargeTime: number[];
	maxAmmo: number[];
}

export interface LolV1ChampionSpell {
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
	coefficients: LolV1ChampionSpellCoefficients;
	effectAmounts: LolV1ChampionSpellEffectAmounts;
	ammo: LolV1ChampionSpellAmmo;
	maxLevel: number;
}

export interface LolV1ChampionDTO {
	id: number;
	name: string;
	alias: string;
	title: string;
	shortBio: string;
	tacticalInfo: LolV1ChampionTacticalInfo;
	playstyleInfo: LolV1ChampionPlaystyleInfo;
	squarePortraitPath: string;
	stingerSfxPath: string;
	chooseVoPath: string;
	banVoPath: string;
	roles: string[];
	recommendedItemDefaults: number[];
	skins: LolV1ChampionSkin[];
	passive: LolV1ChampionPassive;
	spells: LolV1ChampionSpell[];
	uncenteredSplashPath: string;
}

export interface ChampionReducedDTO {
	id: number;
	name: string;
	alias: string;
	title: string;
	shortBio: string;
	uncenteredSplashPath: string;
}
