export interface QueueData {
  queueID: number;
  map: string;
  description: null | string;
  notes: null | string;
}

export interface MapData {
  mapID: number;
  mapName: string;
  notes: string;
}

export interface GameModeData {
  gameMode: string;
  description: string;
}

export interface GameTypeData {
  gametype: string;
  description: string;
}
