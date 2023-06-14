import { Component } from '@angular/core';
import { CacheEntity, db } from '@db';
import { openRs2Url } from '@shared/services/open-rs2/open-rs2.model';

@Component({
    selector: 'rs-cache-list',
    templateUrl: './cache-list.component.html',
    styleUrls: ['./cache-list.component.scss']
})
export class CacheListComponent {

    readonly openRs2Url = openRs2Url;

    cacheList$ = db.getCaches();

    displayedColumns: string[] = [ 'id', 'name', 'source', 'size', 'indexes', 'actions' ];

    indexCount(cache: CacheEntity): number {
        if (!cache?.indexFiles?.length) {
            return 0;
        }

        // Do not include the main index in the count (id 255)
        return cache.indexFiles.filter(i => i.indexNumber !== 255).length;
    }

}
