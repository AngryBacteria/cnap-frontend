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

  getItemIcon(id: number) {
    `https://cdn.mobalytics.gg/assets/lol/images/dd/game-items/${id}.png?v04`;
  }
}
