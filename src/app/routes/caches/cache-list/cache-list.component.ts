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
        if (!cache?.source) {
            return '';
        }

        return cache.source === 'local' ? 'Local' : `OpenRS2 (ID: ${cache.openRs2Data?.id || 'Unknown'})`;
    }

    indexCount(cache: CacheEntity): number {
        if (!cache?.indexFiles?.length) {
            return 0;
        }

        // Do not include the main index in the count (id 255)
        return cache.indexFiles.filter(i => i.indexNumber !== 255).length;
    }

}
