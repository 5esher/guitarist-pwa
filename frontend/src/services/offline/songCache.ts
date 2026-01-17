import { Song } from "../types";
import { openDatabase, requestToPromise } from "./indexedDb";

const STORE_NAME = "songs";

const getStore = async (mode: IDBTransactionMode) => {
  const db = await openDatabase([{ name: STORE_NAME, keyPath: "id" }]);
  const transaction = db.transaction(STORE_NAME, mode);
  return transaction.objectStore(STORE_NAME);
};

export const cacheSongs = async (songs: Song[]) => {
  const store = await getStore("readwrite");
  for (const song of songs) {
    store.put(song);
  }
};

export const cacheSong = async (song: Song) => {
  const store = await getStore("readwrite");
  store.put(song);
};

export const getCachedSongs = async (): Promise<Song[]> => {
  const store = await getStore("readonly");
  const request = store.getAll();
  return requestToPromise(request);
};

export const getCachedSongById = async (id: string): Promise<Song | undefined> => {
  const store = await getStore("readonly");
  const request = store.get(id);
  return requestToPromise(request);
};
