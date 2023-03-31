export interface SummonerDB {
  id: string;
  data: {
    name?: string;
    puuid: string;
    accountId?: string;
    revisionDate?: string;
    profileIconId?: string;
    summonerLevel?: string;
  };
}

export interface SummonerData {
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  name: string;
  id: string;
  puuid: string;
  summonerLevel: number;
}

//Champion info from the endpoint of cdragon
//https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/{id}.json

export interface CDragonChampionInfo {
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
  recommendedItemDefaults: any[];
  skins: Skin[];
  passive: Passive;
  spells: Spell[];
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
  isBase: boolean;
  name: string;
  splashPath: string;
  uncenteredSplashPath: string;
  tilePath: string;
  loadScreenPath: string;
  skinType: string;
  rarity: string;
  isLegacy: boolean;
  splashVideoPath: null;
  collectionSplashVideoPath: null;
  featuresText: null;
  chromaPath: null | string;
  emblems: null;
  regionRarityId: number;
  rarityGemPath: null;
  skinLines: SkinLine[] | null;
  description: null | string;
  loadScreenVintagePath?: string;
  chromas?: Chroma[];
}

export interface Chroma {
  id: number;
  name: Name;
  chromaPath: string;
  colors: string[];
  descriptions: Description[];
  rarities: Rarity[];
}

export interface Description {
  region: Region;
  description: string;
}

export enum Region {
  Riot = 'riot',
  Tencent = 'TENCENT',
}

export enum Name {
  CafeCutiesAnnie = 'Cafe Cuties Annie',
  FrightNightAnnie = 'Fright Night Annie',
  LunarBeastAnnie = 'Lunar Beast Annie',
}

export interface Rarity {
  region: Region;
  rarity: number;
}

export interface SkinLine {
  id: number;
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
  coefficients: Coefficients;
  effectAmounts: { [key: string]: number[] };
  ammo: Ammo;
  maxLevel: number;
}

export interface Ammo {
  ammoRechargeTime: number[];
  maxAmmo: number[];
}

export interface Coefficients {
  coefficient1: number;
  coefficient2: number;
}

export interface TacticalInfo {
  style: number;
  difficulty: number;
  damageType: string;
}

//Summoner spell / summonerspell
export interface SummonerSpell {
  id: number;
  name: string;
  description: string;
  summonerLevel: number;
  cooldown: number;
  gameModes: string[];
  iconPath: string;
}

//League Item / Leagueitem
export interface LeagueItem {
  id: number;
  name: string;
  description: string;
  active: boolean;
  inStore: boolean;
  from?: (number | null)[] | null;
  to?: (number | null)[] | null;
  categories?: (string | null)[] | null;
  maxStacks: number;
  requiredChampion: string;
  requiredAlly: string;
  requiredBuffCurrencyName: string;
  requiredBuffCurrencyCost: number;
  specialRecipe: number;
  isEnchantment: boolean;
  price: number;
  priceTotal: number;
  iconPath: string;
}
