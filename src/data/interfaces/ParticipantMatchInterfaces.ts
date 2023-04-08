export interface ParticipantMatch {
  id: string;
  match_id: string;
  match_id_puuid: string;
  summoner_id: string;
  puuid: string;
  data_participant: DataParticipant;
  data_match: DataMatch;
}

export interface DataMatch {
  mapId: number;
  teams: Team[];
  gameId: number;
  matchId: string;
  queueId: number;
  gameMode: string;
  gameName: string;
  gameType: string;
  platformId: string;
  dataVersion: string;
  gameVersion: string;
  gameCreation: number;
  gameDuration: number;
  participants: string[];
  tournamentCode: string;
  gameStartTimestamp: number;
}

export interface Team {
  win: boolean;
  bans: Ban[];
  teamId: number;
  objectives: Objectives;
}

export interface Ban {
  pickTurn: number;
  championId: number;
}

export interface Objectives {
  baron: Baron;
  tower: Baron;
  dragon: Baron;
  champion: Baron;
  inhibitor: Baron;
  riftHerald: Baron;
}

export interface Baron {
  first: boolean;
  kills: number;
}

export interface DataParticipant {
  win: boolean;
  lane: string;
  role: string;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  kills: number;
  perks: Perks;
  puuid: string;
  deaths: number;
  teamId: number;
  assists: number;
  goldSpent: number;
  nexusLost: number;
  totalHeal: number;
  baronKills: number;
  champLevel: number;
  championId: number;
  goldEarned: number;
  nexusKills: number;
  pentaKills: number;
  riotIdName: string;
  summonerId: string;
  timePlayed: number;
  bountyLevel: number;
  doubleKills: number;
  dragonKills: number;
  profileIcon: number;
  quadraKills: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  summoner1Id: number;
  summoner2Id: number;
  tripleKills: number;
  turretKills: number;
  turretsLost: number;
  unrealKills: number;
  visionScore: number;
  wardsKilled: number;
  wardsPlaced: number;
  championName: string;
  summonerName: string;
  teamPosition: string;
  killingSprees: number;
  participantId: number;
  riotIdTagline: string;
  summonerLevel: number;
  firstBloodKill: boolean;
  firstTowerKill: boolean;
  inhibitorKills: number;
  inhibitorsLost: number;
  itemsPurchased: number;
  nexusTakedowns: number;
  summoner1Casts: number;
  summoner2Casts: number;
  champExperience: number;
  timeCCingOthers: number;
  trueDamageDealt: number;
  trueDamageTaken: number;
  turretTakedowns: number;
  firstBloodAssist: boolean;
  firstTowerAssist: boolean;
  largestMultiKill: number;
  magicDamageDealt: number;
  magicDamageTaken: number;
  objectivesStolen: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  totalTimeCCDealt: number;
  totalUnitsHealed: number;
  championTransform: number;
  individualPosition: string;
  inhibitorTakedowns: number;
  totalMinionsKilled: number;
  totalTimeSpentDead: number;
  damageSelfMitigated: number;
  detectorWardsPlaced: number;
  largestKillingSpree: number;
  physicalDamageDealt: number;
  physicalDamageTaken: number;
  consumablesPurchased: number;
  damageDealtToTurrets: number;
  gameEndedInSurrender: boolean;
  neutralMinionsKilled: number;
  teamEarlySurrendered: boolean;
  largestCriticalStrike: number;
  totalHealsOnTeammates: number;
  damageDealtToBuildings: number;
  longestTimeSpentLiving: number;
  sightWardsBoughtInGame: number;
  damageDealtToObjectives: number;
  objectivesStolenAssists: number;
  visionWardsBoughtInGame: number;
  gameEndedInEarlySurrender: boolean;
  trueDamageDealtToChampions: number;
  magicDamageDealtToChampions: number;
  totalDamageDealtToChampions: number;
  physicalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
}

export interface Perks {
  styles: Style[];
  statPerks: StatPerks;
}

export interface StatPerks {
  flex: number;
  defense: number;
  offense: number;
}

export interface Style {
  style: number;
  selections: Selection[];
  description: string;
}

export interface Selection {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}
