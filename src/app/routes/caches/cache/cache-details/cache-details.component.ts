import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { hideAppBusyIndicator, showAppBusyIndicator } from '@shared/signals/app-busy-indicator';
import { CacheEntity, db } from '@db';
import { IndexFile } from '@rs2/file-store/lib/file-store';
import { jagIndexNames, js5IndexNames } from '@shared/services/cache/cache.model';

@Component({
    selector: 'rs-cache-details',
    templateUrl: './cache-details.component.html',
    styleUrls: ['./cache-details.component.scss']
})
export class CacheDetailsComponent {

    readonly displayedColumns: string[] = [ 'index', 'name', 'size', 'fileCount', 'actions' ];

    cache: CacheEntity | undefined;

    private readonly redirect = [ '/', 'caches' ];
    private readonly routeSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.routeSubscription = route.params.subscribe(params => {
            if (!params['cacheId']) {
                this.router.navigate(this.redirect);
                this.snackBar.open('Invalid cache id provided.', 'Dismiss');
                return;
            }

            const cacheId = parseInt(params['cacheId']);
            if (isNaN(cacheId)) {
                this.router.navigate(this.redirect);
                this.snackBar.open('Invalid cache id provided.', 'Dismiss');
                return;
            }

            this.getCache(cacheId);
        });
    }

    async getCache(cacheId: number): Promise<void> {
        showAppBusyIndicator();

        const cache = await db.findCacheById(cacheId);

        if (!cache) {
            this.router.navigate(this.redirect);
            this.snackBar.open(`Cache ${cacheId} was not found.`, 'Dismiss');
        } else {
            this.cache = cache;
        }

        hideAppBusyIndicator();
    }

    indexName(indexNumber: number): string {
        if (!this.cache?.dataFile?.cacheFormat || indexNumber > 255 || indexNumber < 0) {
            return '';
        }

        return this.cache.dataFile.cacheFormat === 'js5' ? js5IndexNames[indexNumber] : jagIndexNames[indexNumber];
    }

    get indexFiles(): IndexFile[] {
        return this.cache?.indexFiles || [];
    }

}
