import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NavModule } from '@shared/components/nav/nav.module';
import { OpenRs2Service } from '@shared/services/open-rs2/open-rs2.service';
import { PageModule } from '@shared/components/page/page.module';
import { OpenRs2LabelPipe } from '@shared/pipes/open-rs2-label.pipe';
import { OpenRs2RoutingModule } from './open-rs2-routing.module';
import { OpenRs2Component } from './open-rs2.component';
import { OpenRs2SearchComponent } from './open-rs2-search/open-rs2-search.component';
import { OpenRs2CacheComponent } from './open-rs2-cache/open-rs2-cache.component';


@NgModule({
    declarations: [
        OpenRs2Component,
        OpenRs2SearchComponent,
        OpenRs2CacheComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatCardModule,
        MatInputModule,
        MatSnackBarModule,
        MatSelectModule,
        OpenRs2RoutingModule,
        NavModule,
        PageModule,
        OpenRs2LabelPipe
    ],
    providers: [
        OpenRs2Service
    ]
})
export class OpenRs2Module {
}
