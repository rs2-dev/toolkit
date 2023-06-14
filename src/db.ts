import Dexie, { Table } from 'dexie';
import { DataFile, IndexFile } from '@rs2/file-store/lib/file-store';
import { OpenRs2Cache, OpenRs2Scope } from '@shared/services/open-rs2/open-rs2.model';

export type CacheSource = 'openrs2' | 'local';

export interface CacheEntity {
    id?: number;
    name: string;
    source: CacheSource;
    openRs2Data?: OpenRs2Cache;
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

    async findCacheById(id: number): Promise<CacheEntity | undefined> {
        return this.caches.get(id);
    }
}

export const db = new AppDB();
