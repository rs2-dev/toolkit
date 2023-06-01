export type OpenRs2Scope = 'runescape' | string | null;
export type OpenRs2Game = 'runescape' | 'darkscape' | string | null;

export interface OpenRs2BuildNumber {
    major: number | null;
    minor: number | null;
}

export interface OpenRs2FileStore {
    id: number;
    scope: OpenRs2Scope;
    game: OpenRs2Game;
    environment: 'live' | 'beta' | string | null;
    language: 'en' | 'de' | 'fr' | 'pt' | string | null;
    builds: OpenRs2BuildNumber[] | null;
    timestamp: string | null; // ISO 8601 format
    sources: string[] | null;
    valid_indexes: number | null;
    indexes: number | null;
    valid_groups: number | null;
    groups: number | null;
    valid_keys: number | null;
    keys: number | null;
    size: number | null;
    blocks: number | null;
    disk_store_valid: boolean | null;
}
