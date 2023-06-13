import Dexie, { Table } from 'dexie';
import { DataFile, IndexFile } from '@rs2/file-store/lib/file-store';

export interface CacheEntity {
    id?: number;
    name: string;
    openRs2Id?: number;
    dataFile?: DataFile;
    indexFiles?: IndexFile[];
}

export class AppDB extends Dexie {
    caches!: Table<CacheEntity, number>;

    constructor() {
        super('rs_cache_db');
        this.version(3).stores({
            caches: '++id'
        });
    }

    async getCaches(): Promise<CacheEntity[]> {
        return this.caches.orderBy('id').reverse().toArray();
    }
}

export const db = new AppDB();
