export interface SummonerSpellDataResponse {
  type: string;
  version: string;
  data: Record<string, SummonerSpellData>;
}

export interface SummonerSpellData {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  effect: (number[] | null)[];
  effectBurn: (null | string)[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: CostType;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image;
  resource: CostType;
}

export enum CostType {
  Nbsp = '&nbsp;',
  NoCost = 'No Cost',
}

export interface Image {
  full: string;
  sprite: Sprite;
  group: Group;
  x: number;
  y: number;
  w: number;
  h: number;
}

export enum Group {
  Spell = 'spell',
}

export enum Sprite {
  Spell0PNG = 'spell0.png',
}
