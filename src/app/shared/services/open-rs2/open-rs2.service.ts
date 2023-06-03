import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, Observable } from 'rxjs';
import { compareDesc, parseISO } from 'date-fns';
import { OpenRs2Build, OpenRs2Cache, OpenRs2Game, OpenRs2Scope, openRs2Url } from './open-rs2.model';
import { SortDirection } from '@angular/material/sort';

@Injectable()
export class OpenRs2Service {

    constructor(private http: HttpClient) {
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
