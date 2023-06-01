import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { OpenRs2BuildNumber, OpenRs2FileStore, OpenRs2Scope } from '../../../../services/open-rs2/open-rs2.model';
import { OpenRs2Service } from '../../../../services/open-rs2/open-rs2.service';

@Component({
    selector: 'rs-open-rs2-file-store',
    templateUrl: './open-rs2-file-store.component.html',
    styleUrls: ['./open-rs2-file-store.component.scss']
})
export class OpenRs2FileStoreComponent implements OnInit, OnDestroy {

    routeSubscription!: Subscription;
    scope: OpenRs2Scope | null = null;
    id: number | null = null;
    fileStore: OpenRs2FileStore | null = null;

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

            if (params['fileStoreScope']) {
                this.scope = params['fileStoreScope'];
            }

            if (params['fileStoreId']) {
                this.id = parseInt(params['fileStoreId']);
            }

            if (!this.scope || !this.id || isNaN(this.id)) {
                this.router.navigate(['/', 'import', 'openrs2']);
            } else {
                this.fileStore = await this.openRs2Service.getFileStoreDetails(this.id, this.scope);

                console.log(this.fileStore);

                if (!this.fileStore) {
                    this.router.navigate(['/', 'import', 'openrs2']);
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }

    formatBuilds(builds: OpenRs2BuildNumber[] | null): string {
        return this.openRs2Service.formatBuilds(builds);
    }

}
