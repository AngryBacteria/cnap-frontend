export interface ChampionDataResponse {
  type: string;
  format: string;
  version: string;
  data: Record<string, ChampionData>;
}

export interface ChampionData {
  id: string;
  key: string;
  name: string;
  title: string;
  image: Image;
  skins: Skin[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  partype: string;
  info: Info;
  stats: Record<string, number>;
  spells: Spell[];
  passive: Passive;
}

export interface Image {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Info {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface Passive {
  name: string;
  description: string;
  image: Image;
}

export interface Skin {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
}

export interface Spell {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip: Leveltip;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  effect: (number[] | null)[];
  effectBurn: (null | string)[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image;
  resource: string;
}

export interface Leveltip {
  label: string[];
  effect: string[];
}
