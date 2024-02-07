import { leagueItems } from 'src/data/json/leagueItems';
import { QueueDTO, queues } from 'src/data/json/queues';
import { summonerSpells } from 'src/data/json/summonerSpells';
import {
  StorageKeys,
  readObjectFromLocal,
  saveObjectToLocal,
} from './StorageHelper';
import { ChampionResponse } from 'src/data/interfaces/Champion';
import { ItemResponse } from 'src/data/interfaces/Item';

interface FetchOptions {
  storageKey: StorageKeys;
  urlPath: string;
}

export default class RiotHelper {
  private static INSTANCE: RiotHelper;
  public latestPatch = '14.2.1';

  constructor() {
    this.updatePatch();
  }

  public static getInstance(): RiotHelper {
    if (!RiotHelper.INSTANCE) {
      RiotHelper.INSTANCE = new RiotHelper();
    }
    return RiotHelper.INSTANCE;
  }

  async updatePatch(): Promise<void> {
    const response = await fetch(
      'https://ddragon.leagueoflegends.com/api/versions.json',
    );
    if (response.ok) {
      const data = await response.json();
      this.latestPatch = data[0];
      const currentSaved = readObjectFromLocal<string>(
        StorageKeys.LATEST_PATCH,
      );
      if (currentSaved !== this.latestPatch) {
        console.log('Riot Data is outdated, updating....');
        await this.updateData();
      } else {
        console.log('Riot Data is up to date');
      }
      saveObjectToLocal<string>(StorageKeys.LATEST_PATCH, this.latestPatch);
    }
  }

  async updateData() {
    await this.getChampions();
    await this.getItems();
  }

  async getItems() {
    await this.fetchFromAPI<ItemResponse>({
      storageKey: StorageKeys.ITEMS,
      urlPath: `https://ddragon.leagueoflegends.com/cdn/${this.latestPatch}/data/en_US/item.json`,
    });
  }

  async getChampions() {
    return await this.fetchFromAPI<ChampionResponse>({
      storageKey: StorageKeys.CHAMPIONS,
      urlPath: `https://ddragon.leagueoflegends.com/cdn/${this.latestPatch}/data/en_US/champion.json`,
    });
  }

  async fetchFromAPI<T>(
    options: FetchOptions,
    forceUpdate = false,
  ): Promise<T | undefined> {
    if (!forceUpdate) {
      const cachedData = readObjectFromLocal<T>(options.storageKey);
      if (cachedData) {
        console.log(`Read ${options.storageKey} data from cache`);
        return cachedData;
      }
    }
    const response = await fetch(options.urlPath);
    if (response.ok) {
      console.log(`Read ${options.storageKey} data from API`);
      const data = (await response.json()) as T;
      saveObjectToLocal<T>(options.storageKey, data);
      return data;
    }
    return undefined;
  }

  getChampionJSON(id: number): string {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${id}.json`;
  }

  getChampionSquaredPortrait(id: number): string {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${id}.png`;
  }

  getProfileIcon(id: number): string {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${id}.jpg`;
  }

  getItemIcon(id: number): string {
    if (id == 0) return this.getItemPlaceholder();

    const item = leagueItems.find((item) => item.id === id);

    if (item) {
      return `https://raw.communitydragon.org/latest/game/assets/items/icons2d/${item.iconPath
        .split('/')
        .pop()
        ?.toLowerCase()}`;
    }
    return this.getItemPlaceholder();
  }

  getItemPlaceholder(): string {
    return 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/gp_ui_placeholder.png';
  }

  //TODO redo
  getLaneIcon(lane: string): string {
    switch (lane) {
      case 'TOP':
        return 'https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-top-faded.svg';
      case 'JUNGLE':
        return 'https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-jg-faded.svg';
      case 'MIDDLE':
        return 'https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-mid-faded.svg';
      case 'BOTTOM':
        return 'https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-bot-faded.svg';
      default:
        return 'https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-sup-bright.svg';
    }
  }

  getSummerSpellIcon(id: number): string {
    const spell = summonerSpells.find((sp) => sp.id === id);
    if (spell) {
      return `https://raw.communitydragon.org/latest/game/data/spells/icons2d/${spell.iconPath
        .split('/')
        .pop()
        ?.toLowerCase()}`;
    }
    return this.getItemPlaceholder();
  }

  getQueueInfo(id: number): QueueDTO | undefined {
    return queues.find((queue) => queue.queueId == id);
  }
}
