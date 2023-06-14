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

export type OpenRs2Scope = 'runescape' | string | null;
export type OpenRs2Game = 'runescape' | 'darkscape' | string | null;
export type OpenRs2Env = 'live' | 'beta' | string | null;
export type OpenRs2Lang = 'en' | 'de' | 'fr' | 'pt' | string | null;

export interface OpenRs2Build {
    major: number | null;
    minor: number | null;
}

export interface OpenRs2Cache {
    id: number;
    scope: OpenRs2Scope;
    game: OpenRs2Game;
    environment: OpenRs2Env;
    language: OpenRs2Lang;
    builds: OpenRs2Build[] | null;
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
