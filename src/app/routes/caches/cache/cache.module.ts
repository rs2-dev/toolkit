import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CacheRoutingModule } from './cache-routing.module';
import { CacheComponent } from './cache.component';
import { CacheDetailsComponent } from './cache-details/cache-details.component';
import { PageModule } from '@shared/components/page/page.module';


@NgModule({
    declarations: [
        CacheComponent,
        CacheDetailsComponent
    ],
    imports: [
        CommonModule,
        CacheRoutingModule,
        PageModule,
        MatSnackBarModule
    ]
})
export class CacheModule {
}
