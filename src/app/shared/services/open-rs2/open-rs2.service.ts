import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SortDirection } from '@angular/material/sort';
import { lastValueFrom } from 'rxjs';
import { compareDesc, parseISO } from 'date-fns';
import { Buffer } from 'buffer';
import * as JSZip from 'jszip';

import { OpenRs2Build, OpenRs2Cache, OpenRs2Game, OpenRs2Scope, openRs2Url } from './open-rs2.model';
import { PackedCache, packedCacheFileName, readPackedCache } from '@rs2/cache';
import { CacheEntity, db } from '@db';
import { hideAppBusyIndicator, showAppBusyIndicator } from '@shared/signals/app-busy-indicator';

@Injectable()
export class OpenRs2Service {

    constructor(private http: HttpClient) {
    }

    async importCache(
        router: Router,
        snackBar: MatSnackBar,
        cache: OpenRs2Cache,
        name?: string
    ): Promise<CacheEntity | null> {
        showAppBusyIndicator('Importing cache from OpenRS2...');

        try {
            const diskCacheBuffer = await this.getDiskCache(cache.id, cache.scope);
            const jsZip = new JSZip();
            const diskCacheZip = await jsZip.loadAsync(Buffer.from(diskCacheBuffer));
            const filePaths = Object.keys(diskCacheZip.files);

            const packedCache: PackedCache = {};

            for (const filePath of filePaths) {
                // Make sure the file name includes 'main_file_cache' in the name
                if (!filePath?.includes(packedCacheFileName)) {
                    continue;
                }

                const fileData = await diskCacheZip.file(filePath)?.async('nodebuffer');
                const fileName = filePath.substring(filePath.indexOf(packedCacheFileName));
                if (fileData?.length) {
                    packedCache[fileName] = fileData;
                } else {
                    console.error(`${filePath} is empty or unable to be decompressed!`);
                }
            }

            const { dataFile, indexFiles } = readPackedCache(packedCache);

            const cacheEntity: CacheEntity = {
                name: name || `open-rs2-cache-${this.formatBuilds(cache.builds).replace(/, /g, '-')}`,
                source: 'openrs2',
                openRs2Data: cache,
                dataFile,
                indexFiles
            };

            cacheEntity.id = await db.caches.add(cacheEntity);

            hideAppBusyIndicator();
            await router.navigate([ '/', 'caches', cacheEntity.id ]);
            snackBar.open('Cache imported from OpenRS2 successfully.', 'Dismiss');
            return cacheEntity;
        } catch (e) {
            hideAppBusyIndicator();
            snackBar.open('Error importing cache from OpenRS2.', 'Dismiss');
            console.error(`Error importing cache from OpenRS2.`, e);
            return null;
        }
    }

    async getDiskCache(
        id: number,
        scope: OpenRs2Scope = 'runescape'
    ): Promise<ArrayBuffer> {
        return lastValueFrom(this.http.get(
            `${openRs2Url}/caches/${scope}/${id}/disk.zip`,
            { responseType: 'arraybuffer' },
        ));
    }

    async getCacheDetails(
        id: number,
        scope: OpenRs2Scope = 'runescape'
    ): Promise<OpenRs2Cache | null> {
        const caches = await this.getAvailableCaches(scope);
        return caches.find(cache => cache.id === id) || null;
    }

    async getAvailableCaches(
        scope: OpenRs2Scope = 'runescape',
        game?: OpenRs2Game
    ): Promise<OpenRs2Cache[]> {
        let data: OpenRs2Cache[] = [];

        const savedCachesStr = localStorage.getItem('openrs2_caches');
        if (savedCachesStr) {
            try {
                data = JSON.parse(savedCachesStr);
            } catch (e) {
                console.error(`Error loading cached OpenRS2 cache list`, e);
            }
        }

        if (!data?.length) {
            data = await lastValueFrom(this.http.get<OpenRs2Cache[]>(
                `${openRs2Url}/caches.json`
            ));
            localStorage.setItem('openrs2_caches', JSON.stringify(data));
        }

        if (scope || game) {
            data = this.sortCaches(data.filter(
                cache => (
                    !scope || scope === cache.scope
                ) && (
                    !game || game === cache.game
                )
            ));
        }

        return data;
    }

    sortCaches(
        caches: OpenRs2Cache[],
        sortField: string = 'builds',
        sortDirection: SortDirection = 'desc'
    ): OpenRs2Cache[] {
        let sorted = caches;

        if (sortField === 'game') {
            sorted = sorted.sort((a, b) => {
                const gameA = a.game || '';
                const gameB = b.game || '';
                return gameA.localeCompare(gameB);
            });
        } else if (sortField === 'builds') {
            sorted = this.sortByBuilds(sorted, sortDirection);
        } else if (sortField === 'timestamp') {
            sorted = sorted.sort(
                (a, b) => {
                    if (a.timestamp === null) {
                        return 1;
                    }

                    if (b.timestamp === null) {
                        return -1;
                    }

                    return compareDesc(parseISO(b.timestamp), parseISO(a.timestamp));
                }
            );
        }

        if (sortField !== 'builds' && sortDirection === 'asc') {
            sorted = sorted.reverse();
        }

        return sorted;
    }

    sortByBuilds(
        caches: OpenRs2Cache[],
        sortDirection: SortDirection = 'desc'
    ): OpenRs2Cache[] {
        const sorted = caches.sort((a, b) => {
            if (!a.builds?.length) {
                return 1;
            }

            if (!b.builds?.length) {
                return -1;
            }

            const firstBuildA = parseFloat(this.formatBuild(a.builds[0]));
            const firstBuildB = parseFloat(this.formatBuild(b.builds[0]));

            return firstBuildA - firstBuildB;
        });

        return sortDirection === 'asc' ? sorted.reverse() : sorted;
    }

    formatBuilds(builds: OpenRs2Build[] | null): string {
        if (!builds?.length) {
            return '';
        }

        return builds.map(b => this.formatBuild(b)).join(', ');
    }

    formatBuild(build: OpenRs2Build): string {
        if (build === null || (build.major === null && build.minor === null)) {
            return '';
        }

        if (build.major === null) {
            return `0.${build.minor}`;
        }

        if (build.minor === null) {
            return `${build.major}`;
        }

        return `${build.major}.${build.minor}`;
    }

}
