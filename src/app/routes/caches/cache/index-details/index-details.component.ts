import { Component, OnDestroy } from '@angular/core';
import { CacheEntity, db } from '@db';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { hideAppBusyIndicator, showAppBusyIndicator } from '@shared/signals/app-busy-indicator';
import { jagIndexNames, js5IndexNames } from '@shared/services/cache/cache.model';
import { getFileData, IndexFile, Js5Archive, decodeJs5Archive, unpackJs5File, Js5File, Js5Group } from '@rs2/cache';
import { DataBuffer } from '@rs2/buffer';

@Component({
    selector: 'rs-index-details',
    templateUrl: './index-details.component.html',
    styleUrls: ['./index-details.component.scss']
})
export class IndexDetailsComponent implements OnDestroy {

    // @todo support JAG (earlier) format indexes - 15/Jun/23 - Kiko

    readonly displayedColumns: string[] = [ 'id', 'name', 'files', 'version', 'actions' ];

    cache: CacheEntity | undefined;
    index: IndexFile | undefined;
    js5Archive: Js5Archive | undefined;
    js5File: Js5File | undefined;

    private readonly redirectUrl = [ '/', 'caches' ];
    private readonly routeSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.routeSubscription = route.params.subscribe(params => {
            if (!route.parent?.snapshot.params['cacheId']) {
                this.redirect('Invalid cache id provided.');
                return;
            }

            if (!params['indexNumber']) {
                this.redirect('Invalid index number provided.');
                return;
            }

            const cacheId = parseInt(route.parent.snapshot.params['cacheId']);

            if (isNaN(cacheId)) {
                this.redirect('Invalid cache id provided.');
                return;
            }

            const indexNumber = parseInt(params['indexNumber']);

            if (isNaN(indexNumber)) {
                this.redirect('Invalid index number provided.');
                return;
            }

            this.getIndex(cacheId, indexNumber);
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    getArchive(): void {
        if (!this.cache || !this.index) {
            return;
        }

        if (!this.cache.dataFile?.data) {
            this.redirect(`The main cache data file was not found.`);
            return;
        }

        const mainIndex = this.cache.indexFiles?.find(i => i.indexNumber === 255);

        if (!mainIndex?.data) {
            this.redirect(`The main cache index file was not found.`);
            return;
        }

        this.cache.dataFile.data = DataBuffer.from(this.cache.dataFile.data);
        mainIndex.data = DataBuffer.from(mainIndex.data);

        const archiveFileData = getFileData(
            this.cache.dataFile,
            mainIndex,
            this.index.indexNumber
        );

        this.js5File = unpackJs5File(archiveFileData);

        console.log(this.js5File);

        if (!this.js5File?.fileData) {
            this.redirect(`The archive data was not found.`);
            return;
        }

        this.js5Archive = decodeJs5Archive(this.index.indexNumber, this.js5File.fileData) || undefined;

        console.log(this.js5Archive);
    }

    async getIndex(cacheId: number, indexNumber: number): Promise<void> {
        showAppBusyIndicator();

        this.cache = await db.findCacheById(cacheId);

        if (!this.cache) {
            this.redirect(`Cache ${cacheId} was not found.`);
        } else {
            this.index = this.cache.indexFiles?.find(i => i.indexNumber === indexNumber);

            if (!this.index) {
                this.redirect(`Index ${indexNumber} was not found.`);
            } else {
                this.getArchive();
            }
        }

        hideAppBusyIndicator();
    }

    private redirect(message: string): void {
        this.router.navigate(this.redirectUrl);
        this.snackBar.open(message, 'Dismiss');
    }

    get indexName(): string {
        if (!this.cache?.dataFile?.cacheFormat || this.index?.indexNumber === undefined) {
            return '';
        }

        return this.cache.dataFile.cacheFormat === 'js5' ? js5IndexNames[this.index.indexNumber] : jagIndexNames[this.index.indexNumber];
    }

    get groups(): Js5Group[] {
        return this.js5Archive?.groups || [];
    }

}
