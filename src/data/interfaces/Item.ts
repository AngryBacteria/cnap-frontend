export interface ItemResponse {
  type: Type;
  version: string;
  data: { [key: string]: ItemDTO };
  groups: Group[];
  tree: Tree[];
}

export interface Gold {
  base: number;
  total: number;
  sell: number;
  purchasable: boolean;
}

export interface Rune {
  isrune: boolean;
  tier: number;
  type: string;
}

export interface ItemDTO {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  into?: string[];
  image: Image;
  gold: Gold;
  tags: Tag[];
  maps: { [key: string]: boolean };
  stats: { [key: string]: number };
  effect?: Effect;
  inStore?: boolean;
  from?: string[];
  depth?: number;
  consumed?: boolean;
  stacks?: number;
  hideFromAll?: boolean;
  consumeOnFull?: boolean;
  requiredChampion?: string;
  specialRecipe?: number;
  requiredAlly?: RequiredAlly;
}

export interface Effect {
  Effect1Amount: string;
  Effect2Amount?: string;
  Effect3Amount?: string;
  Effect4Amount?: string;
  Effect5Amount?: string;
  Effect6Amount?: string;
  Effect7Amount?: string;
  Effect8Amount?: string;
  Effect9Amount?: string;
  Effect10Amount?: string;
  Effect11Amount?: string;
  Effect12Amount?: string;
  Effect13Amount?: string;
  Effect14Amount?: string;
  Effect15Amount?: string;
  Effect16Amount?: string;
  Effect17Amount?: string;
  Effect18Amount?: string;
}

export interface Image {
  full: string;
  sprite: Sprite;
  group: Type;
  x: number;
  y: number;
  w: number;
  h: number;
}

export enum Type {
  Item = 'item',
}

export enum Sprite {
  Item0PNG = 'item0.png',
  Item1PNG = 'item1.png',
  Item2PNG = 'item2.png',
  Item3PNG = 'item3.png',
  Item4PNG = 'item4.png',
}

export enum RequiredAlly {
  Ornn = 'Ornn',
}

export enum Tag {
  AbilityHaste = 'AbilityHaste',
  Active = 'Active',
  Armor = 'Armor',
  ArmorPenetration = 'ArmorPenetration',
  AttackSpeed = 'AttackSpeed',
  Aura = 'Aura',
  Boots = 'Boots',
  Consumable = 'Consumable',
  CooldownReduction = 'CooldownReduction',
  CriticalStrike = 'CriticalStrike',
  Damage = 'Damage',
  GoldPer = 'GoldPer',
  Health = 'Health',
  HealthRegen = 'HealthRegen',
  Jungle = 'Jungle',
  Lane = 'Lane',
  LifeSteal = 'LifeSteal',
  MagicPenetration = 'MagicPenetration',
  MagicResist = 'MagicResist',
  Mana = 'Mana',
  ManaRegen = 'ManaRegen',
  NonbootsMovement = 'NonbootsMovement',
  OnHit = 'OnHit',
  Slow = 'Slow',
  SpellBlock = 'SpellBlock',
  SpellDamage = 'SpellDamage',
  SpellVamp = 'SpellVamp',
  Stealth = 'Stealth',
  Tenacity = 'Tenacity',
  Trinket = 'Trinket',
  Vision = 'Vision',
}

export interface Group {
  id: string;
  MaxGroupOwnable: string;
}

export interface Tree {
  header: string;
  tags: string[];
}
