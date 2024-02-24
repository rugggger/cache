import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as os from 'os';
import { DAY, MINUTE } from './constants';
import { CacheItem, CacheState, Key } from './types';

@Injectable()
export class CacheService {
  cache: Map<string, CacheItem>;
  static CleanCacheInterval = MINUTE * 30;
  static MaximumCacheAge = DAY;
  static MinimumFreeMemory = 1000000;
  static PageSize = 10;
  constructor() {
    this.cache = new Map<string, CacheItem>();
    setInterval(this.CleanCache.bind(this), CacheService.CleanCacheInterval);
  }
  CleanCache() {
    console.log('clean cache');
    const freeMemory = os.freemem();
    if (freeMemory < CacheService.MinimumFreeMemory) {
      const RemoveCacheFromThisTime = Date.now() - CacheService.MaximumCacheAge;
      this.cache.forEach((v, k) => {
        if (RemoveCacheFromThisTime > v.updated) {
          this.cache.delete(k);
        }
      });
    }
  }

  Put(id: string, item: Object) {
    const size = Buffer.byteLength(JSON.stringify(item));
    const freeMemory = os.freemem();
    if (freeMemory - size < CacheService.MinimumFreeMemory) {
        throw new HttpException('not enough memory', HttpStatus.PAYLOAD_TOO_LARGE)
    }

    let cache: CacheItem = this.cache.get(id);

    if (cache != undefined) {
      cache.item = item;
      cache.updated = Date.now();
    } else {
      cache = {
        id: id,
        created: Date.now(),
        updated: Date.now(),
        lastHit: null,
        item: item,
      };
      this.cache.set(id, cache);
    }
    console.log(this.cache);
    return {
      id: cache.id,
      created: cache.created,
      updated: cache.updated,
      item: cache.item,
    };
  }

  Get(id: string) {
    let cache = this.cache.get(id);
    if (cache != undefined) {
      cache.lastHit = Date.now();
      return cache.item;
    } else {
      throw new HttpException('cache item not found', HttpStatus.NOT_FOUND);
    }
  }

  Delete(id: string) {
    let success = this.cache.delete(id);
    if (!success) {
      throw new HttpException('cache item not found', HttpStatus.NOT_FOUND);
    }
  }

  GetCacheState(page: number): CacheState {
    let keys: Key[] = []
    let index: number = 1
    let startPushAt = (page-1) * CacheService.PageSize
    for (let [key, value] of this.cache.entries()) {
        index++;
        if (index > (startPushAt + (CacheService.PageSize+1))) {
            break
        }
        if (index>=startPushAt) {
            keys.push({
                id: key,
                created: value.created,
                updated: value.updated,
                lastHit: value.lastHit
            })
        }
    }
    
    return {
      items: this.cache.size,
      freeMemory: os.freemem(),
      keys
    }
  }
}
