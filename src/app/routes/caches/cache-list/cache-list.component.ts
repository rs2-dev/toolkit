import { Component } from '@angular/core';
import { CacheEntity, db } from '@db';

@Component({
    selector: 'rs-cache-list',
    templateUrl: './cache-list.component.html',
    styleUrls: ['./cache-list.component.scss']
})
export class CacheListComponent {

    cacheList$ = db.getCaches();

    displayedColumns: string[] = [ 'id', 'name', 'source', 'size', 'indexes', 'actions' ];

    displaySource(cache: CacheEntity): string {
        if (!cache) {
            return '';
        }

        if (!cache.openRs2Id) {
            return 'Local';
        }

        return `OpenRS2 (ID: ${cache.openRs2Id})`;
    }

    displayIndexes(cache: CacheEntity): number {
        if (!cache?.indexFiles?.length) {
            return 0;
        }

        return cache.indexFiles.filter(i => i.indexNumber !== 255).length;
    }

}
