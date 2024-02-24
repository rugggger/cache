import { CacheState } from "../types";

const CACHE_ENDPOINT = "http://localhost:3001/cache";
export async function putData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function PutCache(id: string, item: Object) {
  const url = `${CACHE_ENDPOINT}/${id}`;
  const res = await putData(url, item);

  return res;
}

export async function GetCache(id: string): Promise<Object> {
    let item: Object = {};
    const url = `${CACHE_ENDPOINT}/${id}`;
    const res = await fetch(url);
    try {
        const res = await fetch(url);
        item = await res.json();
      } catch (e) {
        console.error("error", e);
      }
    return item;
  }

export async function GetCacheState(): Promise<CacheState> {
  const url = `${CACHE_ENDPOINT}`;
  let cacheState: any;
  try {
    const res = await fetch(url);
    cacheState = await res.json();
  } catch (e) {
    console.error("error", e);
  }
  return cacheState;
}
