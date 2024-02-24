export interface CacheItem {
  id: string;
  item: Object;
  created: number;
  updated: number;
  lastHit: number;
}



export type Key = Pick<CacheItem, "id" | "created" | "updated" | "lastHit">;

export interface CacheState {
    items: number
    freeMemory: number
    keys: Key[]
}