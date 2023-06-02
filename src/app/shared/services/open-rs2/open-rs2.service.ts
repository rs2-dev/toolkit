import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, Observable } from 'rxjs';
import { compareDesc, parseISO } from 'date-fns';
import { OpenRs2BuildNumber, OpenRs2FileStore, OpenRs2Game, OpenRs2Scope, openRs2Url } from './open-rs2.model';
import { SortDirection } from '@angular/material/sort';

@Injectable()
export class OpenRs2Service {

    constructor(private http: HttpClient) {
    }

    async getFileStoreDetails(
        id: number,
        scope: OpenRs2Scope = 'runescape'
    ): Promise<OpenRs2FileStore | null> {
        const fileStores = await this.getAvailableFileStores(scope);
        return fileStores.find(fileStore => fileStore.id === id) || null;
    }

    async getAvailableFileStores(
        scope: OpenRs2Scope = 'runescape',
        game?: OpenRs2Game
    ): Promise<OpenRs2FileStore[]> {
        let data: OpenRs2FileStore[] = [];

        const savedFileStoresStr = localStorage.getItem('openrs2_file_stores');
        if (savedFileStoresStr) {
            try {
                data = JSON.parse(savedFileStoresStr);
            } catch (e) {
                console.error(`Error loading cached file store data`, e);
            }
        }

        if (!data?.length) {
            data = await lastValueFrom(this.http.get<OpenRs2FileStore[]>(
                `${openRs2Url}/caches.json`
            ));
            localStorage.setItem('openrs2_file_stores', JSON.stringify(data));
        }

        if (scope || game) {
            data = this.sortFileStores(data.filter(
                fileStore => (
                    !scope || scope === fileStore.scope
                ) && (
                    !game || game === fileStore.game
                )
            ));
        }

        return data;
    }

    sortFileStores(
        fileStores: OpenRs2FileStore[],
        sortField: string = 'builds',
        sortDirection: SortDirection = 'desc'
    ): OpenRs2FileStore[] {
        let sorted = fileStores;

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
        fileStores: OpenRs2FileStore[],
        sortDirection: SortDirection = 'desc'
    ): OpenRs2FileStore[] {
        const sorted = fileStores.sort((a, b) => {
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

    formatBuilds(builds: OpenRs2BuildNumber[] | null): string {
        if (!builds?.length) {
            return '';
        }

        return builds.map(b => this.formatBuild(b)).join(', ');
    }

    formatBuild(build: OpenRs2BuildNumber): string {
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
