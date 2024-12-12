export interface GameData {
  champions: Champion[];
  items: Item[];
  game_modes: GameMode[];
  game_types: GameType[];
  maps: Map[];
  queues: Queue[];
}

export interface Champion {
  id: number;
  key: string;
  name: string;
  title: string;
  icon: string;
  resource: string;
  attackType: string;
  adaptiveType: EType;
  positions: string[];
  roles: string[];
  releaseDate: Date;
  releasePatch: string;
  patchLastChanged: string;
  lore: string;
  faction: string;
  abilities: Abilities;
  attributeRatings: AttributeRatings;
  fullName: string;
  price: Price;
  skins: Skin[];
  stats: Record<string, ChampionStat>;
}

export interface Abilities {
  P: E[];
  Q: E[];
  W: E[];
  E: E[];
  R: E[];
}

export interface E {
  name: string;
  icon: string;
  effects: Effect[];
  cost: CostClass | null;
  cooldown: Cooldown | null;
  targeting: string;
  affects: string;
  spellshieldable: null | string;
  resource: Resource | null;
  damageType: EType | null;
  spellEffects: null | string;
  projectile: Projectile | null;
  onHitEffects: null;
  occurrence: null;
  notes: string;
  blurb: string;
  missileSpeed: null;
  rechargeRate: null;
  collisionRadius: null | string;
  tetherRadius: null;
  onTargetCdStatic: null;
  innerRadius: null;
  speed: null | string;
  width: null | string;
  angle: null | string;
  castTime: null | string;
  effectRadius: null | string;
  targetRange: null | string;
}

export interface Cooldown {
  modifiers: Modifier[];
  affectedByCdr: boolean;
}

export interface Modifier {
  values: number[];
  units: Unit[];
}

export enum Unit {
  Ad = '% AD',
  Ap = '% AP',
  BasedOnLevel = ' (based on level)',
  BonusAD = '% bonus AD',
  Empty = '',
  Per100AP = '% per 100 AP',
  Purple = '%',
  Seconds = ' seconds',
  The103Per100BonusAttackSpeed = '1 + 0.3 per 100% bonus attack speed',
  The10502Per100CriticalStrikeChance = '1 + (0.5 + 0.2) per 100% critical strike chance',
  Unit = '  ×',
}

export interface CostClass {
  modifiers: Modifier[];
}

export enum EType {
  MagicDamage = 'MAGIC_DAMAGE',
  MixedDamage = 'MIXED_DAMAGE',
  PhysicalDamage = 'PHYSICAL_DAMAGE',
}

export interface Effect {
  description: string;
  leveling: Leveling[];
}

export interface Leveling {
  attribute: string;
  modifiers: Modifier[];
}

export enum Projectile {
  Special = 'SPECIAL',
  True = 'TRUE',
}

export enum Resource {
  Energy = 'ENERGY',
  Mana = 'MANA',
}

export interface AttributeRatings {
  damage: number;
  toughness: number;
  control: number;
  mobility: number;
  utility: number;
  abilityReliance: number;
  difficulty: number;
}

export interface Price {
  blueEssence: number;
  rp: number;
  saleRp: number;
}

export interface Skin {
  name: string;
  id: number;
  isBase: boolean;
  availability: Availability;
  formatName: string;
  lootEligible: boolean;
  cost: CostEnum | number;
  sale: number;
  distribution: null | string;
  rarity: RarityEnum;
  chromas: Chroma[];
  lore: null | string;
  release: Date;
  set: string[];
  splashPath: string;
  uncenteredSplashPath: string;
  tilePath: string;
  loadScreenPath: string;
  loadScreenVintagePath: null | string;
  newEffects: boolean;
  newAnimations: boolean;
  newRecall: boolean;
  newVoice: boolean;
  newQuotes: boolean;
  voiceActor: VoiceActor[];
  splashArtist: string[];
}

export enum Availability {
  Available = 'Available',
  Legacy = 'Legacy',
  Limited = 'Limited',
  Rare = 'Rare',
}

export interface Chroma {
  name: string;
  id: number;
  chromaPath: string;
  colors: string[];
  descriptions: Description[];
  rarities: RarityElement[];
}

export interface Description {
  description: null | string;
  region: Region | null;
}

export enum Region {
  Riot = 'riot',
  Tencent = 'TENCENT',
}

export interface RarityElement {
  rarity: number | null;
  region: Region | null;
}

export enum CostEnum {
  Special = 'Special',
}

export enum RarityEnum {
  Epic = 'Epic',
  Legendary = 'Legendary',
  Mythic = 'Mythic',
  NoRarity = 'NoRarity',
  Rare = 'Rare',
  Transcendent = 'Transcendent',
}

export enum VoiceActor {
  AshlyBurch = 'Ashly Burch',
  HarlanHogan = 'Harlan Hogan',
  KriziaBajos = 'Krizia Bajos',
  LauraPost = 'Laura Post',
  RamonTikaram = 'Ramon Tikaram',
  SunilMalhotra = 'Sunil Malhotra',
}

export interface ChampionStat {
  flat: number;
  percent: number;
  perLevel: number;
  percentPerLevel: number;
}

export interface GameMode {
  gameMode: string;
  description: string;
}

export interface GameType {
  gametype: string;
  description: string;
}

export interface Item {
  name: string;
  id: number;
  tier: number;
  icon: string;
  active: never[];
  buildsFrom: number[];
  buildsInto: number[];
  iconOverlay: boolean;
  nicknames: never[];
  noEffects: boolean;
  passives: never[];
  rank: string[];
  removed: boolean;
  requiredAlly: string;
  requiredChampion: string;
  shop: Shop;
  simpleDescription: string;
  specialRecipe: number;
  stats: Record<string, ItemStat>;
}

export interface Shop {
  prices: Prices;
  purchasable: boolean;
  tags: string[];
}

export interface Prices {
  total: number;
  combined: number;
  sell: number;
}

export interface ItemStat {
  flat: number;
  percent: number;
  perLevel: number;
  percentPerLevel: number;
  percentBase: number;
  percentBonus: number;
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
