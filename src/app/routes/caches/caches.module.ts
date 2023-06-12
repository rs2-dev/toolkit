import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CachesRoutingModule } from './caches-routing.module';
import { CachesComponent } from './caches.component';
import { CacheListComponent } from './cache-list/cache-list.component';
import { PageModule } from '@shared/components/page/page.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [
        CachesComponent,
        CacheListComponent
    ],
    imports: [
        CommonModule,
        CachesRoutingModule,
        PageModule,
        MatButtonModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule
    ]
})
export class CachesModule {
}
