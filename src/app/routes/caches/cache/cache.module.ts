import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CacheRoutingModule } from './cache-routing.module';
import { CacheComponent } from './cache.component';
import { CacheDetailsComponent } from './cache-details/cache-details.component';
import { PageModule } from '@shared/components/page/page.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FolderModule } from '@shared/components/folder/folder.module';
import { IndexDetailsComponent } from './index-details/index-details.component';


@NgModule({
    declarations: [
        CacheComponent,
        CacheDetailsComponent,
        IndexDetailsComponent
    ],
    imports: [
        CommonModule,
        CacheRoutingModule,
        PageModule,
        MatSnackBarModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatTooltipModule,
        FolderModule
    ]
})
export class CacheModule {
}
