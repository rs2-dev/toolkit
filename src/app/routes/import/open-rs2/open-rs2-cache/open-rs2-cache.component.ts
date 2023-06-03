import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
    OpenRs2Cache,
    OpenRs2Scope,
    openRs2Url
} from '../../../../shared/services/open-rs2/open-rs2.model';
import { OpenRs2Service } from '../../../../shared/services/open-rs2/open-rs2.service';

@Component({
    selector: 'rs-open-rs2-cache',
    templateUrl: './open-rs2-cache.component.html',
    styleUrls: ['./open-rs2-cache.component.scss']
})
export class OpenRs2CacheComponent implements OnInit, OnDestroy {

    routeSubscription!: Subscription;
    scope: OpenRs2Scope | null = null;
    id: number | null = null;
    cache: OpenRs2Cache | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private openRs2Service: OpenRs2Service
    ) {
    }

    ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe(async params => {
            this.scope = null;
            this.id = null;

            if (params['cacheScope']) {
                this.scope = params['cacheScope'];
            }

            if (params['cacheId']) {
                this.id = parseInt(params['cacheId']);
            }

            if (!this.scope || !this.id || isNaN(this.id)) {
                this.router.navigate(['/', 'import', 'openrs2']);
            } else {
                this.cache = await this.openRs2Service.getCacheDetails(this.id, this.scope);

                console.log(this.cache);

                if (!this.cache) {
                    this.router.navigate(['/', 'import', 'openrs2']);
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }

    get builds(): string {
        return this.openRs2Service.formatBuilds(this.cache?.builds || null);
    }

    get openRs2Link(): string {
        if (!this.cache) {
            return '';
        }

        return `https://archive.openrs2.org/caches/${this.cache.scope}/${this.cache.id}`;
    }

    get mapLink(): string {
        if (!this.cache) {
            return '';
        }

        return `${openRs2Url}/caches/${this.cache.scope}/${this.cache.id}/map.png`;
    }

    get encryptionKeysLink(): string {
        if (!this.cache) {
            return '';
        }

        return `${openRs2Url}/caches/${this.cache.scope}/${this.cache.id}/keys.json`;
    }

    get diskStoreLink(): string {
        if (!this.cache) {
            return '';
        }

        return `${openRs2Url}/caches/${this.cache.scope}/${this.cache.id}/disk.zip`;
    }

}
