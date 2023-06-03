import Dexie, { Table } from 'dexie';

export interface CacheEntity {
    id?: number;
    name: string;
    openRs2Id?: number;
    dataFile?: Buffer;
    indexFiles?: Buffer[];
}

export class AppDB extends Dexie {
    caches!: Table<CacheEntity, number>;

    constructor() {
        super('rs_cache_db');
        this.version(3).stores({
            caches: '++id'
        });
        // this.on('populate', () => this.populate());
    }

    async populate() {
    }
}

export const db = new AppDB();
