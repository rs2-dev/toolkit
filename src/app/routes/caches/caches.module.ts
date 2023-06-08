import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CachesRoutingModule } from './caches-routing.module';
import { CachesComponent } from './caches.component';
import { CacheListComponent } from './cache-list/cache-list.component';
import { PageModule } from '@shared/components/page/page.module';


@NgModule({
    declarations: [
        CachesComponent,
        CacheListComponent
    ],
    imports: [
        CommonModule,
        CachesRoutingModule,
        PageModule
    ]
})
export class CachesModule {
}
