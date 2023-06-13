import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CacheRoutingModule } from './cache-routing.module';
import { CacheComponent } from './cache.component';
import { CacheDetailsComponent } from './cache-details/cache-details.component';


@NgModule({
    declarations: [
        CacheComponent,
        CacheDetailsComponent
    ],
    imports: [
        CommonModule,
        CacheRoutingModule
    ]
})
export class CacheModule {
}
