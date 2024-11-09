export interface ItemDataResponse {
  version: string;
  data: Record<string, ItemData>;
}

export interface ItemDataWithId extends ItemData {
  id: string;
}

export interface ItemData {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  into?: string[];
  image: Image;
  gold: Gold;
  tags: Tag[];
  maps: Record<string, boolean>;
  stats: Record<string, number>;
  from?: string[];
  depth?: number;
  inStore?: boolean;
  effect?: Effect;
  consumed?: boolean;
  stacks?: number;
  hideFromAll?: boolean;
  consumeOnFull?: boolean;
  specialRecipe?: number;
  requiredChampion?: string;
}

export interface Gold {
  base: number;
  total: number;
  sell: number;
  purchasable: boolean;
}

export interface Effect {
  effect1Amount: string;
  effect2Amount?: string;
  effect3Amount?: string;
  effect4Amount?: string;
  effect5Amount?: string;
  effect6Amount?: string;
  effect7Amount?: string;
  effect8Amount?: string;
  effect9Amount?: string;
  effect10Amount?: string;
  effect11Amount?: string;
  effect12Amount?: string;
  effect13Amount?: string;
  effect14Amount?: string;
  effect15Amount?: string;
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
  Item5PNG = 'item5.png',
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
