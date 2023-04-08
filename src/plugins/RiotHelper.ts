import { QueueDTO } from 'src/data/interfaces/CustomInterfaces';
import { leagueItems } from 'src/data/json/leagueItems';
import { queues } from 'src/data/json/queues';
import { summonerSpells } from 'src/data/json/summonerSpells';

export default class RiotHelper {
  private static INSTANCE: RiotHelper;
  private static LATEST_PATCH = '13.4';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public static getInstance(): RiotHelper {
    if (!RiotHelper.INSTANCE) {
      RiotHelper.INSTANCE = new RiotHelper();
    }
    return RiotHelper.INSTANCE;
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

    console.log(item?.iconPath);
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
