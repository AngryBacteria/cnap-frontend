import { ChampionData, ChampionDataResponse } from '../model/ChampionData.ts';
import {
  ShortChampionData,
  ShortChampionDataResponse,
} from '../model/ShortChampionData.ts';
import { ItemDataResponse, ItemDataWithId } from '../model/ItemData.ts';
import {
  SummonerSpellData,
  SummonerSpellDataResponse,
} from '../model/SummonerSpellData.ts';
import {
  GameModeData,
  GameTypeData,
  MapData,
  QueueData,
} from '../model/RiotGeneral.ts';

export class RiotAssetsUtil {
  //https://developer.riotgames.com/docs/lol
  // https://www.communitydragon.org/documentation
  // https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/queues.json

  private static INSTANCE: RiotAssetsUtil;
  private static BASE_PATCH = '14.22.1';

  currentPatchVersion: string;

  private constructor() {
    this.currentPatchVersion = RiotAssetsUtil.BASE_PATCH;
    void this.updateCurrentPatchVersion();
  }

  public static getInstance(): RiotAssetsUtil {
    if (!RiotAssetsUtil.INSTANCE) {
      RiotAssetsUtil.INSTANCE = new RiotAssetsUtil();
    }
    return RiotAssetsUtil.INSTANCE;
  }

  public async updateCurrentPatchVersion() {
    try {
      const response = await fetch(
        'https://ddragon.leagueoflegends.com/api/versions.json',
      );
      const data = (await response.json()) as string[];
      this.currentPatchVersion = data[0];
    } catch (error) {
      console.error('Error:', error);
      this.currentPatchVersion = RiotAssetsUtil.BASE_PATCH;
    }
  }

  //
  // Champion specific function
  //

  public async getShortChampionsData(): Promise<ShortChampionData[]> {
    try {
      const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${this.currentPatchVersion}/data/en_US/champion.json`,
      );
      const shortChampionResponse =
        (await response.json()) as ShortChampionDataResponse;
      return Object.values(shortChampionResponse.data);
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  public async getChampionData(name: string): Promise<ChampionData | null> {
    try {
      const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${this.currentPatchVersion}/data/en_US/champion/${name}.json`,
      );
      const championResponseData =
        (await response.json()) as ChampionDataResponse;
      return championResponseData.data[name];
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  public getChampionIcon(id: number): string {
    return `https://cdn.communitydragon.org/${this.currentPatchVersion}/champion/${id}/square`;
  }

  public getChampionSplashArt(id: number): string {
    return `https://cdn.communitydragon.org/${this.currentPatchVersion}/champion/${id}/splash-art`;
  }

  public getChampionSkinSplashArt(id: number, skinId: number): string {
    return `https://cdn.communitydragon.org/${this.currentPatchVersion}/champion/${id}/skin/${skinId}/splash-art`;
  }

  public getChampionSplashArtCentered(id: number): string {
    return `https://cdn.communitydragon.org/${this.currentPatchVersion}/champion/${id}/splash-art/centered`;
  }

  public getChampionPortrait(id: number): string {
    return `https://cdn.communitydragon.org/${this.currentPatchVersion}/champion/${id}/portrait`;
  }

  public getChampionAbilityIcons(id: number) {
    return {
      p: `https://cdn.communitydragon.org/${this.currentPatchVersion}/champion/${id}/ability-icon/p`,
      q: `https://cdn.communitydragon.org/${this.currentPatchVersion}/champion/${id}/ability-icon/q`,
      w: `https://cdn.communitydragon.org/${this.currentPatchVersion}/champion/${id}/ability-icon/w`,
      e: `https://cdn.communitydragon.org/${this.currentPatchVersion}/champion/${id}/ability-icon/e`,
      r: `https://cdn.communitydragon.org/${this.currentPatchVersion}/champion/${id}/ability-icon/r`,
    };
  }

  //
  // Profile specific functions
  //

  public getProfileIcon(id: number): string {
    return `https://cdn.communitydragon.org/${this.currentPatchVersion}/profile-icon/${id}`;
  }

  //
  // Item specific functions
  //
  public async getItemsData(): Promise<ItemDataWithId[]> {
    try {
      const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${this.currentPatchVersion}/data/en_US/item.json`,
      );
      const itemDataResponse = (await response.json()) as ItemDataResponse;
      return Object.entries(itemDataResponse.data).map(
        ([itemId, itemData]) => ({
          ...itemData,
          id: itemId,
        }),
      );
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  public getItemIcon(id: number): string {
    return `https://ddragon.leagueoflegends.com/cdn/${this.currentPatchVersion}/img/item/${id}.png`;
  }

  //
  // Summoner spell specific functions
  //
  public async getSummonerSpellsData(): Promise<SummonerSpellData[]> {
    try {
      const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${this.currentPatchVersion}/data/en_US/summoner.json`,
      );
      const summonerSpellResponse =
        (await response.json()) as SummonerSpellDataResponse;
      return Object.values(summonerSpellResponse.data);
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  //
  // Other general riot data
  //

  public async getQueuesData(): Promise<QueueData[]> {
    try {
      const response = await fetch(
        `https://static.developer.riotgames.com/docs/lol/queues.json`,
      );
      return (await response.json()) as QueueData[];
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  public async getMapsData(): Promise<MapData[]> {
    try {
      const response = await fetch(
        `https://static.developer.riotgames.com/docs/lol/maps.json`,
      );
      return (await response.json()) as MapData[];
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  public async getGameModesData(): Promise<GameModeData[]> {
    try {
      const response = await fetch(
        `https://static.developer.riotgames.com/docs/lol/gameModes.json`,
      );
      return (await response.json()) as GameModeData[];
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  public async getGameTypesData(): Promise<GameTypeData[]> {
    try {
      const response = await fetch(
        `https://static.developer.riotgames.com/docs/lol/gameTypes.json`,
      );
      return (await response.json()) as GameTypeData[];
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
}
