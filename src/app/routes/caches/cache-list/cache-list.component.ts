import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from '@db';

@Component({
    selector: 'rs-cache-list',
    templateUrl: './cache-list.component.html',
    styleUrls: ['./cache-list.component.scss']
})
export class CacheListComponent {

    cacheList$ = liveQuery(() => db.caches.toArray());

}
