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
    return `https://cdn.mobalytics.gg/assets/lol/images/dd/game-items/${id}.png?v04`;
  }

  getItemPlaceholder(): string {
    return 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/6696_axiomarc.png';
  }

  getLaneIcon(lane: string): string {
    switch ( lane ) {
      case 'TOP':
          return 'https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-top-faded.svg'
      case 'JUNGLE':
        return 'https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-top-faded.svg'
      case 'MIDDLE':
        return 'https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-top-faded.svg'
      case 'BOTTOM':
        return 'https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-top-faded.svg'
      default:
        return 'https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-top-faded.svg'
   }
  }
}
