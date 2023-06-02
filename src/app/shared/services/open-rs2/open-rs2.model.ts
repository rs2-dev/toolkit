export type OpenRs2Scope = 'runescape' | string | null;
export type OpenRs2Game = 'runescape' | 'darkscape' | string | null;

export const openRs2Url = 'https://archive.openrs2.org';

export const openRs2Labels: {[key: string]: string} = {
    'runescape': 'RuneScape',
    'darkscape': 'DarkScape',
    'live': 'Live',
    'beta': 'Beta',
    'en': 'EN',
    'de': 'DE',
    'fr': 'FR',
    'pt': 'PT'
};

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
    valid_indexes: number;
    indexes: number;
    valid_groups: number;
    groups: number;
    valid_keys: number;
    keys: number;
    size: number;
    blocks: number;
    disk_store_valid: boolean | null;
}
